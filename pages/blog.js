import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostList from '../src/components/PostList';
import PageWithData from '../src/components/PageWithData';

class Blog extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <PostList />
    );
  }
}

export default PageWithData(Blog);
