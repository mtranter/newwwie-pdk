import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { AdminAPIRepository, PublicAPIRepository, SlackInvite } from '@newwwie/types';
import { Member } from '@newwwie/types/lib/members/member';
import { DynamoObject, tableBuilder } from 'funamots';

type SlackInviteDto = {
  hk: string;
  sk: string;
  email: string;
  entityType: 'SLACK_INVITE';
  slackInvite: SlackInvite;
};
type MemberDto = {
  hk: string;
  sk: string;
  entityType: 'MEMBER';
  member: Member;
};
// Use  to enable existental qualification
type Dto = SlackInviteDto | MemberDto;

export const DynamoDbRepo = ({
  dynamoDB,
  tableName,
}: {
  dynamoDB?: DynamoDB;
  tableName: string;
}): PublicAPIRepository & AdminAPIRepository => {
  const table = tableBuilder<Dto>(tableName).withKey('hk', 'sk').build({ client: dynamoDB });
  const buildSlackInviteHk = (id: string) => `SlackInvite#${id}`;
  return {
    saveSlackInvite: async (slackInvite) => {
      await table.put({
        hk: buildSlackInviteHk(slackInvite.id),
        sk: `#SlackInvite#`,
        email: slackInvite.email,
        entityType: 'SLACK_INVITE',
        slackInvite: slackInvite,
      });
    },
    listSlackInvites: async () => {
      const scanResult = await table.scan({
        filterExpression: { entityType: { '=': 'SLACK_INVITE' } },
      });
      return {
        invites: scanResult.records.map((item) => (item as SlackInviteDto).slackInvite),
      };
    },
    listMembers: async () => {
      const doScan = async (agg: Member[], nextPage?: DynamoObject): Promise<Member[]> => {
        const scanResult = await table.scan({
          filterExpression: { entityType: { '=': 'MEMBER' } },
          startKey: nextPage,
        });
        const members = scanResult.records.map((item) => (item as MemberDto).member);
        const allMembers = [...agg, ...members];
        return scanResult.nextStartKey ? doScan(allMembers, scanResult.nextStartKey) : allMembers;
      };
      return doScan([]);
    },
    getInvites: async (ids: string[]) => {
      const items = await table.batchGet(ids.map((id) => ({ hk: buildSlackInviteHk(id), sk: `#SlackInvite#` })));
      return items.map((item) => (item as SlackInviteDto).slackInvite);
    },
    approveInvites: async (ids, members) => {
      await table.transactWrite({
        deletes: ids.map((id) => ({
          item: { hk: buildSlackInviteHk(id), sk: `#SlackInvite#` },
        })),
        puts: members.map((member) => ({
          item: {
            hk: `Member#${member.id}`,
            sk: `#Member#`,
            entityType: 'MEMBER',
            email: member.email,
            member: member,
          },
        })),
      });
    },
  };
};
