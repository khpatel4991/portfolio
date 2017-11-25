import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MdMenu from 'react-icons/lib/md/menu';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  fullAppBar: {
    position: 'absolute',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  navContainer: {
    float: 'right',
    justifyContent: 'flex-end',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

const layout = (BaseComponent) => {
  class ComposedComponent extends PureComponent {
    componentDidMount() {
      console.log(this.props);
    }

    state = {
      mobileOpen: false,
    };
  
    handleDrawerToggle = () => {
      this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
      const { classes, theme } = this.props;
      const drawer = (
        <div>
          <div className={classes.drawerHeader} />
          <List>
            <ListItem button>
              <ListItemText primary="Blog" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="About Me" />
            </ListItem>
          </List>
        </div>
      );
  
      return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <Hidden mdUp>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="contrast"
                    aria-label="open drawer"
                    onClick={this.handleDrawerToggle}
                    className={classes.navIconHide}
                  >
                    <MdMenu />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Drawer
                type="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                classes={{
                  paper: classes.drawerPaper,
                }}
                onRequestClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
              <AppBar className={classes.fullAppBar}>
                <Toolbar>
                  <Typography className={classes.flex} />
                  <Button color="contrast">Blog</Button>
                  <Button color="contrast">About Me</Button>
                </Toolbar>
              </AppBar>
            </Hidden>
            <main className={classes.content}>
              <BaseComponent {...this.props} />
            </main>
          </div>
        </div>
      )
    }
  }
  return withStyles(styles, { withTheme: true })(ComposedComponent);
};

export default layout;
