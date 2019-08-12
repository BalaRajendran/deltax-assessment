import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
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
    location.reload();
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  render() {
    return (
      <Grid>
        {(this.props.title == "Add New Movie" ||
          this.props.title == "Add New Actor") && (
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
              onClick={this.handleOpen}
            >
              <Add /> {this.props.name}{" "}
            </Button>
          </div>
        )}
        <Dialog
          name={this.props.name}
          head={this.props.head}
          title={this.props.title}
          open={this.state.open}
          handleClose={this.handleClose}
        />
      </Grid>
    );
  }
}

export default DialogTitle;
