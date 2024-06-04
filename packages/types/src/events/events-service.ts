export type Event = {
  title: string;
  description: string;
  dateTime: string;
  eventUrl: string;
  going: number;
  maxTickets: number;
  duration: number;
  imageUrl: string;
  venue?: {
    name?: string;
    city?: string;
  };
  group: {
    name: string;
    urlname: string;
    groupPhoto: {
      id: string;
      baseUrl: string;
      preview: string;
    };
    logo: {
      id: string;
      baseUrl: string;
      preview: string;
    };
  };
};

export interface EventsService {
  getEvents(): Promise<Event[]>;
}
