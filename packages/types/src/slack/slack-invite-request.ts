export type SlackInvite = {
  readonly id: string;
  readonly createDateISO: string;
  readonly email: string;
  readonly company: string;
  readonly position: string;
  readonly linkedIn?: string;
  readonly howDidYouHearAboutUs: string;
  readonly anythinElse?: string;
};
