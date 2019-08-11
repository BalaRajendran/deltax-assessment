import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Grid, Hidden } from "@material-ui/core";
import ActorsList from "./../../components/ActorsList/ActorsList";

class Actor extends Component {
  render() {
    return <ActorsList />;
  }
}
export default Actor;
