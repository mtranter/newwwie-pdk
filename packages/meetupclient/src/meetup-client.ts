export const gqlQuery = `
query {
  keywordSearch(
    filter: {
      query: "%"
      lat: -32.9283
      lon: 151.7817
      radius: 20
      source: EVENTS
      topicCategoryId: 546
    }
    sort: { sortField: DATETIME, sortOrder: DESC }
  ) {
    edges {
      node {
        result {
          ...on Event {
            title
            description
            dateTime
            eventUrl
            going
            maxTickets
            duration
            imageUrl
            venue {
              name
              lat
              lng
              address
              city
            }
            group {
              name
              urlname
              groupPhoto {
                id
                baseUrl
                preview
              }
              logo {
                id
                baseUrl
                preview
              }
            }
          }
        }
      }
    }
  }
}
`;

export const getMeetupData = async (f: typeof fetch = fetch) => {
  const query = { query: gqlQuery };
  return f('https://www.meetup.com/gql', {
    method: 'POST',
    body: JSON.stringify(query),
  })
    .then((r) => r.json())
    .then((r) => r.data as Queries.EventsPageQuery);
};
