import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden } from "@material-ui/core";
import { Styles } from "./HomePageStyle";
import TopNavBar from "./../../components/NavBars/TopNavBar";
import Container from "../../components/Container/Container";

class Home extends Component {
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
        <Grid container className={classes.mainContainer} direction="column">
          <Grid item xs="1">
            <TopNavBar selTab={tabIndex} />{" "}
          </Grid>{" "}
          <Grid item xs>
            <Container />
          </Grid>{" "}
        </Grid>{" "}
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Styles)(Home);
