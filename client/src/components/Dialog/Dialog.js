import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import DialogHead from "./TitleComponent";
import NewActors from "./../Actor/NewActors";
import NewMovies from "./../Movies/NewMovies";
import UpdateActors from "./../Actor/UpdateActors";
import UpdateMovies from "./../Movies/UpdateMovies";
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
    let tab = <NewMovies />;
    switch (this.props.title) {
      case "Add New Actor":
        tab = <NewActors />;
        break;
      case "Add New Movie":
        tab = <NewMovies />;
        break;
      case "Update Movie":
        tab = (
          <UpdateMovies
            _id={this.props.id}
            poster={this.props.poster}
            moviename={this.props.moviename}
            year={this.props.year}
            plot={this.props.plot}
            cost={this.props.cost}
          />
        );
        break;
      case "Update Actor":
        tab = (
          <UpdateActors
            _id={this.props.id}
            name={this.props.actorname}
            bio={this.props.bio}
            sex={this.props.sex}
            dob={this.props.dob}
          />
        );
        break;
      default:
        tab = <UpdateActors />;
        break;
    }
    return (
      <Grid>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent className={classes.setwidth}>{tab}</DialogContent>
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
