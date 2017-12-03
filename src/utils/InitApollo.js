import fetch from 'isomorphic-fetch';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const create = (initialState) => {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: 'https://api.graph.cool/simple/v1/cjaq34xy00mhf0121q4o3rq5y',
      opts: {
        credentials: 'same-origin',
      },
    }),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

export default (initialState) => {
  if (!process.browser) {
    return create(initialState);
  }
  if (!apolloClient) {
    apolloClient = create(initialState);
  }
  return apolloClient;
};

