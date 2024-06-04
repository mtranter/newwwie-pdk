import { SlackInvite } from '..';
import { Member } from '../members/member';

export type AdminAPIRepository = {
  listSlackInvites: () => Promise<{ invites: SlackInvite[] }>;

  approveInvites(inviteIds: string[], members: Member[]): Promise<void>;
  getInvites(inviteIds: string[]): Promise<SlackInvite[]>;

  listMembers(): Promise<Member[]>;
};
