import React, { Component } from 'react';

import PostList from '../src/components/PostList';
import PageWithData from '../src/components/PageWithData';

const styles = {
  root: {
    backgroundColor: 'black',
    color: 'white',
  },
  appFrame: {},
  content: {},
};

class Blog extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <PostList />
      </div>
    );
  }
}

export default PageWithData(Blog, styles);
