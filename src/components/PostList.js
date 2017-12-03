import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
            <li key={post.id}>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <small>Last Updated: {post.updatedAt}</small>
              </div>
            </li>
          ))}
        </ul>
        {areMorePosts ? <button onClick={loadMorePosts}> {loading ? 'Loading...' : 'Show More'} </button> : ''}
      </section>
    );
  }
};

PostList.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    allPosts: PropTypes.array.isRequired,
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
