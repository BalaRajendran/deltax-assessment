import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden } from "@material-ui/core";
import { Styles } from "./HomePageStyle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
class Home extends Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.root} />;
  }
}
export default withStyles(Styles)(Home);
