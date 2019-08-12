import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import DialogHead from "./../Dialog/DialogTitle";
import NewActors from "./../Actor/NewActors";
import NewMovies from "./../Movies/NewMovies";
const styles = theme => ({
  setwidth: {
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      width: "unset"
    }
  }
});

class DialogComponent extends React.Component {
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
    const { classes } = this.props;
    return (
      <Grid>
        <DialogHead
          name={this.props.name}
          head={this.props.head}
          handleOpen={this.handleOpen}
        />
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent className={classes.setwidth}>
            {this.props.head == "Actor List" ? <NewActors /> : <NewMovies />}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
          <DialogContent />
        </Dialog>
      </Grid>
    );
  }
}

export default withStyles(styles)(DialogComponent);
