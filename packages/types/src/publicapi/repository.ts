import { SlackInvite } from '..';

export type PublicAPIRepository = {
  saveSlackInvite: (slackInvite: SlackInvite) => Promise<void>;
};
