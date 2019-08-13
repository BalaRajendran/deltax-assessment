import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
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
      <div>
        <Typography
          variant="h6"
          style={{ display: "inline", marginLeft: "20px" }}
        >
          {this.props.head}
        </Typography>
        <Button
          variant="contained"
          style={{
            left: "80%",
            backgroundColor: "#00c851",
            color: "white"
          }}
          onClick={this.props.handleOpen}
        >
          <Add /> Add New Movie
        </Button>
      </div>
    );
  }
}

export default DialogTitle;
