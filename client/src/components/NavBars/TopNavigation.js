import React, { Component } from "react";
import { Styles } from "./TopNavBarStyles";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
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
class Navigation extends Component {
  render() {
    const { classes } = this.props;
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
      <Grid container alignItems="center">
        <Button
          style={{ backgroundColor: isSelect.movie }}
          className={classes.button}
        >
          <Link to="/" style={{ color: "white" }}>
            Movies
          </Link>
        </Button>
        <Button
          style={{ backgroundColor: isSelect.actorlist }}
          className={classes.button}
        >
          <Link to="/actorlist" style={{ color: "white" }}>
            Actor List
          </Link>
        </Button>
        <Button
          style={{ backgroundColor: isSelect.tvshows }}
          className={classes.button}
          color="inherit"
        >
          Tv Shows
        </Button>
        <Button
          style={{ backgroundColor: isSelect.celebrities }}
          className={classes.button}
          color="inherit"
        >
          Celebrities
        </Button>
        <Button
          style={{ backgroundColor: isSelect.watchlist }}
          className={classes.button}
          color="inherit"
        >
          Watch List
        </Button>
      </Grid>
    );
  }
}
export default withStyles(Styles)(Navigation);
