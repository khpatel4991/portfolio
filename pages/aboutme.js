import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import Page from '../src/components/Page';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
    background: 'black',
  },
  appFrame: {},
  content: {},
};

class Aboutme extends Component {
  componentDidMount() {
    console.log('About Me Seen');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography gutterBottom type="subheading">
          Polymath, Hopeful Utopian, Iconoclast and an Outspoken Introvert.
        </Typography>
      </div>
    );
  }
}

Aboutme.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default Page(Aboutme, styles);
