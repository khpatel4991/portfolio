import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import initApollo from '../utils/InitApollo';

const getComponentDisplayName = BaseComponent => BaseComponent.displayName || BaseComponent.name || 'Unknown';

export default ComposedComponent => {
  return class WithData extends Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    static propTypes = {
      serverState: PropTypes.object.isRequired,
    }
    static async getInitialProps(ctx) {
      const { query, pathname } = ctx;
      let serverState = {};
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }
      if (!process.browser) {
        const apollo = initApollo();
        const url = {
          query,
          pathname,
        };
        try {
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          );
        } catch(e) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }
        Head.rewind();
        serverState = {
          apollo: {
            data: apollo.cache.extract()
          }
        }
      }
      return {
        ...composedInitialProps,
        serverState,
      };
    }

    constructor(props) {
      super(props);
      this.apollo = initApollo(props.serverState.apollo.data);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
}