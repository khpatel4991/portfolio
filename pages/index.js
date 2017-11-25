import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../src/hoc/WithRoot';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

class Home extends Component {
  componentDidMount() {
    console.log('Component Mounted');
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Typography type="display1" gutterBottom>
          Kashyap Patel
        </Typography>
        <Typography type="subheading" gutterBottom>
          Portfolio Site
        </Typography>
        <Button raised color="accent">
          Contact Me
        </Button>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRoot(withStyles(styles)(Home));
