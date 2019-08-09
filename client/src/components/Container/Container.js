import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import { Styles } from "./Containerstyles";
class Tabcontainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column">
        <h1>as</h1>
      </Grid>
    );
  }
}

export default withStyles(Styles)(Tabcontainer);
