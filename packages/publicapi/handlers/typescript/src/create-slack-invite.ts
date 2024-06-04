import { DynamoDbRepo } from '@newwwie/dynamodb-data-access';
import {
  createSlackInviteHandler,
  CreateSlackInviteChainedHandlerFunction,
  INTERCEPTORS,
  Response,
  LoggingInterceptor,
} from '@newwwie/publicapi-typescript-runtime';
import { PublicAPIRepository } from '@newwwie/types';
import { v4 as uuidv4 } from 'uuid';

type CreateSlackUtils = {
  getNowISO: () => string;
  getId: () => string;
};

export const _createSlackInvite =
  (repository: PublicAPIRepository, utils: CreateSlackUtils): CreateSlackInviteChainedHandlerFunction =>
    async (request) => {
      LoggingInterceptor.getLogger(request).info(
        'Start CreateSlackInvite Operation',
      );
      const { body } = request.input;
      const id = utils.getId();
      const now = utils.getNowISO();
      const slackInvite = {
        id,
        createDateISO: now,
        ...body,
      };
      await repository.saveSlackInvite(slackInvite);

      return {
        statusCode: 201,
        body: { message: 'Slack invite created' },
      };
    };

/**
 * Type-safe handler for the CreateSlackInvite operation
 */
export const createSlackInvite: CreateSlackInviteChainedHandlerFunction =
  _createSlackInvite(DynamoDbRepo({ tableName: process.env.TABLE_NAME! }), {
    getNowISO: () => new Date().toISOString(),
    getId: () => uuidv4(),
  });


/**
 * Entry point for the AWS Lambda handler for the CreateSlackInvite operation.
 * The createSlackInviteHandler method wraps the type-safe handler and manages marshalling inputs and outputs
 */
export const handler = createSlackInviteHandler(
  ...INTERCEPTORS,
  createSlackInvite,
);
