import {
  listSlackInviteRequestsHandler,
  ListSlackInviteRequestsChainedHandlerFunction,
  INTERCEPTORS,
  Response,
  LoggingInterceptor,
} from '@newwwie/adminapi-typescript-runtime';
import { DynamoDbRepo } from '@newwwie/dynamodb-data-access';
import { AdminAPIRepository } from '@newwwie/types';

export const _listSlackInviteRequests = (repository: AdminAPIRepository): ListSlackInviteRequestsChainedHandlerFunction => async (request) => {
  LoggingInterceptor.getLogger(request).info('Start ListSlackInviteRequests Operation');

  const { invites } = await repository.listSlackInvites();

  return Response.success({
    slackRequests: invites,
  });
};
/**
 * Type-safe handler for the ListSlackInviteRequests operation
 */
export const listSlackInviteRequests: ListSlackInviteRequestsChainedHandlerFunction =
  _listSlackInviteRequests(DynamoDbRepo({ tableName: process.env.TABLE_NAME! }));

/**
 * Entry point for the AWS Lambda handler for the ListSlackInviteRequests operation.
 * The listSlackInviteRequestsHandler method wraps the type-safe handler and manages marshalling inputs and outputs
 */
export const handler = listSlackInviteRequestsHandler(...INTERCEPTORS, listSlackInviteRequests);