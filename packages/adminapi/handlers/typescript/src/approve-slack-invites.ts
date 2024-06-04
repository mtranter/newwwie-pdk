import {
  approveSlackInvitesHandler,
  ApproveSlackInvitesChainedHandlerFunction,
  INTERCEPTORS,
  Response,
  LoggingInterceptor,
} from '@newwwie/adminapi-typescript-runtime';
import { DynamoDbRepo } from '@newwwie/dynamodb-data-access';
import { AdminAPIRepository } from '@newwwie/types';
import { Member } from '@newwwie/types/lib/members/member';

export const _approveSlackInvites = (repository: AdminAPIRepository): ApproveSlackInvitesChainedHandlerFunction => async (request) => {
  const logger = LoggingInterceptor.getLogger(request);
  logger.info('Start ApproveSlackInvites Operation');
  logger.info('Input: ', request.input);

  const { body } = request.input;
  const currentUser = request.context.identity?.cognitoIdentityId;
  const inviteIds = body.invites.map((invite) => invite.id);
  const invites = await repository.getInvites(inviteIds);
  const members = invites.map<Member>((invite) => ({
    ...invite,
    createDateISO: new Date().toISOString(),
    approvedBy: currentUser!,
  }));

  await repository.approveInvites(inviteIds, members);

  return {
    statusCode: 201,
    body: {
      message: 'OK',
    },
  };
};

/**
 * Type-safe handler for the ApproveSlackInvites operation
 */
export const approveSlackInvites: ApproveSlackInvitesChainedHandlerFunction =
  _approveSlackInvites(DynamoDbRepo({ tableName: process.env.TABLE_NAME! }));

/**
 * Entry point for the AWS Lambda handler for the ApproveSlackInvites operation.
 * The approveSlackInvitesHandler method wraps the type-safe handler and manages marshalling inputs and outputs
 */
export const handler = approveSlackInvitesHandler(...INTERCEPTORS, approveSlackInvites);

