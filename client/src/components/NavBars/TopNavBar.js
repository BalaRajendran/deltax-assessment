import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { Styles } from "./TopNavBarStyles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Navigation from "./TopNavigation";
import LeftNav from "./LeftNavBar";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  withStyles,
  SwipeableDrawer,
  IconButton,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  Hidden,
  Toolbar,
  AppBar,
  Divider
} from "@material-ui/core";

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
  }
  componentDidMount() {
    var pathArray2 = window.location.href;
    var pathArray1 = pathArray2.split("/");
    pathArray1 = pathArray1.reverse();
  }
  handleButtonClick = (tabIndex, e) => {
    this.setState({ left: false });
  };
  toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ [side]: open });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AppBar>
            <Toolbar onClick={this.toggleDrawer("left", true)}>
              <Hidden only={["lg", "md", "xl"]}>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Open drawer"
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography
                className={classes.title}
                style={{ color: "#fff" }}
                variant="h6"
              >
                IMDB
              </Typography>
              <Hidden only={["xs", "sm"]}>
                <Navigation />
              </Hidden>
              <Hidden only={["xs", "sm"]}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Hidden>
            </Toolbar>
          </AppBar>
          <Hidden only={["lg", "md", "xl"]}>
            <SwipeableDrawer
              open={this.state.left}
              onClose={this.toggleDrawer("left", false)}
              onOpen={this.toggleDrawer("left", true)}
            >
              <LeftNav onClose={this.toggleDrawer("left", false)} />
            </SwipeableDrawer>
          </Hidden>
        </div>
      </div>
    );
  }
}

TopNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Styles)(TopNavBar);
