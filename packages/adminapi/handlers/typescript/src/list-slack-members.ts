import {
  listSlackMembersHandler,
  ListSlackMembersChainedHandlerFunction,
  INTERCEPTORS,
  Response,
  LoggingInterceptor,
} from '@newwwie/adminapi-typescript-runtime';
import { DynamoDbRepo } from '@newwwie/dynamodb-data-access';
import { AdminAPIRepository } from '@newwwie/types';


export const _listSlackMembers = (repository: AdminAPIRepository): ListSlackMembersChainedHandlerFunction => async (request) => {
  LoggingInterceptor.getLogger(request).info('Start ListSlackMembers Operation');

  const members = await repository.listMembers();

  return Response.success({
    members: members,
  });
};

/**
 * Type-safe handler for the ListSlackMembers operation
 */
export const listSlackMembers: ListSlackMembersChainedHandlerFunction = _listSlackMembers(DynamoDbRepo({ tableName: process.env.TABLE_NAME! }));

/**
 * Entry point for the AWS Lambda handler for the ListSlackMembers operation.
 * The listSlackMembersHandler method wraps the type-safe handler and manages marshalling inputs and outputs
 */
export const handler = listSlackMembersHandler(...INTERCEPTORS, listSlackMembers);