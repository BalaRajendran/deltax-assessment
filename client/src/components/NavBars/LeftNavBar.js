import React from "react";
import { Styles } from "./LeftNavBarStyles";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
// import { Styles } from "./TopNavBarStyles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Navigation from "./TopNavigation";
import { HashLink as Link } from "react-router-hash-link";
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
class LeftNavBar extends React.Component {
  handleButtonClick = () => {};
  render() {
    const { classes, proPic, selTab } = this.props;
    let isSelect = {
      movie: "unset",
      tvshows: "unset",
      celebrities: "unset",
      watchlist: "unset",
      actorlist: "unset"
    };
    var pathArray2 = window.location.href;
    var pathArray1 = pathArray2.split("/");
    pathArray1 = pathArray1.reverse();
    switch (pathArray1[0]) {
      case "movie":
        isSelect.movie = "#423bbf";
        break;
      case "tvshows":
        isSelect.tvshows = "#423bbf";
        break;
      case "actorlist":
        isSelect.actorlist = "#423bbf";
        break;
      case "celebrities":
        isSelect.celebrities = "#423bbf";
        break;
      case "watchlist":
        isSelect.watchlist = "#423bbf";
        break;
      default:
        isSelect.movie = "#423bbf";
        break;
    }
    return (
      <div className={classes.list}>
        <List>
          <ListItem className={classes.listtext} button>
            <ListItemIcon />
            <ListItemText primary={"Admin"} />
          </ListItem>
          <Divider />

          <div className={classes.listspace}>
            <Link
              to="/"
              onClick={this.props.onClose}
              style={{ color: "white" }}
            >
              <ListItem
                className={classes.listtext}
                button
                onClick={this.handleButtonClick}
              >
                <img
                  className={classes.iconcolor}
                  alt="Help"
                  src={"/assets/images/help.png"}
                />
                <ListItemText primary="Movies" />
              </ListItem>
            </Link>
            <Divider className={classes.divider} />
            <Link
              onClick={this.handleButtonClick}
              to="/actorlist"
              style={{ color: "white" }}
            >
              <ListItem
                className={classes.listtext}
                button
                onClick={this.handleButtonClick}
              >
                <img
                  className={classes.iconcolor}
                  alt="Help"
                  src={"/assets/images/help.png"}
                />
                <ListItemText primary="Actor List" />
              </ListItem>
            </Link>
            <Divider className={classes.divider} />
            <ListItem
              className={classes.listtext}
              button
              onClick={this.handleButtonClick}
            >
              <img
                className={classes.iconcolor}
                alt="Help"
                src={"/assets/images/help.png"}
              />
              <ListItemText primary="Tv Shows" />
            </ListItem>
            <Divider className={classes.divider} />
            <ListItem className={classes.listtext} button to="">
              <img
                className={classes.iconcolor}
                alt="Help"
                src={"/assets/images/help.png"}
              />
              <ListItemText primary="Celebrities" />
            </ListItem>
            <Divider className={classes.divider} />
          </div>
        </List>
      </div>
    );
  }
}

export default withStyles(Styles)(LeftNavBar);
