import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import FaGithub from 'react-icons/lib/fa/github';
import FaLinkedin from 'react-icons/lib/fa/linkedin';
import FaTwitter from 'react-icons/lib/fa/twitter';
import Typist from 'react-typist';

import Page from '../src/components/Page';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: 200,
    background: 'black',
  },
  button: {
    margin: theme.spacing.unit,
  },
  appFrame: {},
  content: {},
});

const social = [{
  index: 0,
  label: 'Github',
  link: 'https://github.com/khpatel4991',
  component: <FaGithub color="#fff" />,
}, {
  index: 1,
  label: 'Linkedin',
  link: 'https://linkedin.com/in/khpatel4991',
  component: <FaLinkedin color="#0077b5" />,
}, {
  index: 2,
  label: 'Twitter',
  link: 'https://twitter.com/khpatel4991',
  component: <FaTwitter color="#1da1f2" />,
}];

class Home extends Component {
  static handleButton(link) {
    Router.push(link);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="display1" gutterBottom>
          Kashyap Patel
        </Typography>
        <Typography type="subheading" gutterBottom>
          <Typist>
            I am a Software Developer.
          </Typist>
        </Typography>
        <Grid container justify="center" alignContent="center">
          {social.map(item => (
            <Grid key={item.index} item>
              <a href={item.link} target="_blank">
                <IconButton
                  className={classes.button}
                  aria-label={item.label}
                >
                  {item.component}
                </IconButton>
              </a>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
};

export default Page(Home, styles);
