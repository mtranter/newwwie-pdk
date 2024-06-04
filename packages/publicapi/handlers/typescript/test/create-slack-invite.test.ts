import {
  InternalFailureErrorResponseContent,
  CreateSlackInviteChainedRequestInput,
} from '@newwwie/publicapi-typescript-runtime';
import { PublicAPIRepository, SlackInvite } from '@newwwie/types';
import {
  _createSlackInvite,
} from '../src/create-slack-invite';

// Common request arguments
const requestArguments = {
  chain: undefined as never,
  event: {} as any,
  context: {} as any,
  interceptorContext: {
    logger: {
      info: jest.fn(),
    },
  },
} satisfies Omit<CreateSlackInviteChainedRequestInput, 'input'>;

describe('CreateSlackInvite', () => {

  it('should return not implemented error', async () => {
    let savedInvite: SlackInvite | undefined = undefined;
    const date = '2000-01-01T00:00:00Z';
    const id = '1234';
    const fakeRepo: PublicAPIRepository = {
      saveSlackInvite: async (invite) => {
        savedInvite = invite;
        return Promise.resolve();
      },
    };
    const sut = _createSlackInvite(fakeRepo, {
      getNowISO: () => date,
      getId: () => id,
    });
    const request: Omit<SlackInvite, 'id' | 'createDateISO' | 'approved'> = {
      email: 'johnsmith@newwwie.com',
      company: 'Newwwie',
      position: 'Software Engineer',
      howDidYouHearAboutUs: 'Friend',
    };
    const response = await sut({
      ...requestArguments,
      input: {
        // TODO: remove the "as any" below and fill in test values for the requestParameters and body
        requestParameters: {} as any,
        body: request,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(savedInvite).toEqual({
      id,
      createDateISO: date,
      ...request,
    });
  });

});