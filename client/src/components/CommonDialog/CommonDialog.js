import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import NewActors from "./../Actor/NewActors";
import NewMovies from "../Movies/NewMovies";
const styles = theme => ({
  setwidth: {
    width: "600px",
    [theme.breakpoints.down("sm")]: {
      width: "unset"
    }
  }
});

class DialogComponent extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.openDialog}
          onClose={this.props.handleClose1}
        >
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent className={classes.setwidth}>
            <NewActors />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
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
