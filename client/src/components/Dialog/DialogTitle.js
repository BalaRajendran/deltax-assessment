import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import Dialog from "./Dialog";
class DialogTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClose = () => {
    this.setState({
      open: false
    });
    // location.reload();
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  render() {
    return (
      <Grid>
        <Dialog
          name={this.props.name}
          head={this.props.head}
          title={this.props.title}
          openDialog={this.props.openDialog}
          handleClose={this.handleClose}
        />
      </Grid>
    );
  }
}

export default DialogTitle;
