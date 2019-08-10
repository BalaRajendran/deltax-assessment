import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden } from "@material-ui/core";
import { Styles } from "./HomePageStyle";
import TopNavBar from "./../../components/NavBars/TopNavBar";
import MovieList from "./../../components/Movies/MovieList";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1
    };
  }
  render() {
    const { classes, tabIndex } = this.props;
    return (
      <div className={classes.root}>
        <Grid container direction="column">
          <Grid item container xs={1}>
            <TopNavBar />{" "}
          </Grid>{" "}
          <Grid item xs>
            <MovieList />
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Styles)(HomePage);
