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
  subHeading: {
    lineHeight: '1.3em',
  },
};

class Aboutme extends Component {
  componentDidMount() {
    console.log('About Me Seen');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography gutterBottom type="display1">
          Props
        </Typography>
        <Typography gutterBottom type="subheading" className={classes.subHeading}>
          I am a Polymath, a Hopeful Utopian, an Iconoclast and an Outspoken Introvert.
        </Typography>
        <Typography gutterBottom type="display1">
          State
        </Typography>
        <Typography gutterBottom type="subheading" className={classes.subHeading}>
          Playing a lot of Clash Royale and FIFA 18. Listening to
          <strong><em> Unf*ck Yourself</em></strong> by <strong>Gary Bishop</strong>.
          Watching Sherlock TV Series and Movies.
          Working on my Portfolio site and
          thinking of a topic to write an essay on,
          unlike the nano essay which I scribbled without any thought
          to get my feet wet with GraphQL Mutation on Graphcool Playground.
        </Typography>
        <Typography gutterBottom type="display1">
          Static
        </Typography>
        <Typography gutterBottom type="subheading" className={classes.subHeading}>
          Unsatiable Desire for Icecream and Chocolates.
          Love for my favourite sports Team/Personality:
          Chelsea Football Club, Indian Cricket Team and Rafael Nadal.
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
