import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Typography from 'material-ui/Typography';
import format from 'date-fns/format'
import { graphql } from 'react-apollo';

const POSTS_PER_PAGE = 10;

const PostList = ({ data: { loading, error, allPosts, _allPostsMeta }, loadMorePosts }) => {
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error.toString()}</div>;
  }
  if (allPosts && allPosts.length) {
    const areMorePosts = allPosts.length < _allPostsMeta.count;
    return (
      <section>
        <ul>
          {allPosts.map(post => (
            <div key={post.id}>
              <div>
                <Typography type="display1" gutterBottom>
                  {post.title}
                </Typography>
                <Typography type="body2" gutterBottom paragraph>
                  {post.body}
                </Typography>
                <Typography type="caption" gutterBottom>
                  {format(post.updatedAt, 'MMM Do YYYY')}
                </Typography>
              </div>
            </div>
          ))}
        </ul>
        {areMorePosts ? <button onClick={loadMorePosts}> {loading ? 'Loading...' : 'Show More'} </button> : ''}
      </section>
    );
  }
  return null;
};

PostList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    allPosts: PropTypes.array.isRequired,
    error: PropTypes.string,
  }).isRequired,
  loadMorePosts: PropTypes.func.isRequired,
};

const allPosts = gql`
  query allPosts($first: Int!, $skip: Int!) {
    allPosts(orderBy: updatedAt_DESC, first: $first, skip: $skip) {
      id
      title
      body
      updatedAt
    },
    _allPostsMeta {
      count
    }
  }
`;

export default graphql(allPosts, {
  options: {
    variables: {
      skip: 0,
      first: POSTS_PER_PAGE,
    },
  },
  props: ({ data }) => ({
    data,
    loadMorePosts: () => {
      return data.fetchMore({
        variables: {
          skip: data.allPosts.length,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return {
            ...previousResult,
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
          };
        },
      });
    },
  }),
})(PostList);
