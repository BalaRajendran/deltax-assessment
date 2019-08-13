import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import LazyLoad from "react-lazy-load";
import axios from "axios";
import Edit from "@material-ui/icons/Edit";
import SelectComponent from "../Dialog/TitleComponent";
import {
  MDBBtn,
  MDBTable,
  MDBDataTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import { withStyles, Grid, Hidden } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors";
import UpdateDialog from "./../Dialog/Dialog";
import DialogComponent from "../Dialog/TitleComponent";
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorlist: [],
      isLoading: true,
      openDialog: false,
      open: false,
      Message: "",
      id: "",
      poster: "",
      moviename: "",
      year: "",
      plot: "",
      addDialog: false
    };
  }
  componentWillMount() {
    this.handleFetch();
  }
  handleFetch() {
    axios
      .get("backend/movielist")
      .then(response => {
        let l;
        let r = [];
        for (var i = 0; i < response.data.length; i++) {
          var splitname = response.data[i].moviename.split("@");
          l = {
            moviename: splitname[0],
            year: response.data[i].year.substring(0, 10),
            plot: response.data[i].plot,
            cost: splitname[1],
            poster: (
              <LazyLoad
                width={100}
                height={100}
                debounce={false}
                offsetVertical={500}
              >
                <img
                  src={response.data[i].poster}
                  style={{ width: "100px", height: "100px" }}
                />
              </LazyLoad>
            ),
            edit: (
              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00c851",
                    color: "white"
                  }}
                  id={response.data[i]._id}
                  onClick={this.handleEdit.bind(
                    this,
                    response.data[i]._id,
                    response.data[i].poster,
                    response.data[i].moviename.split("@")[0],
                    response.data[i].year.substring(0, 10),
                    response.data[i].plot,
                    response.data[i].moviename.split("@")[1]
                  )}
                >
                  <Edit />
                </Button>
                <Button
                  variant="contained"
                  className="delete"
                  style={{
                    backgroundColor: "#c9302c",
                    borderColor: "#ac2925",
                    color: "white"
                  }}
                  id={response.data[i]._id}
                  onClick={this.handleDelete.bind(this, response.data[i]._id)}
                >
                  <Delete />
                </Button>
              </div>
            )
          };
          r.push(l);
        }
        var movieCollection = {
          movieList: []
        };
        for (var i in r) {
          var item = r[i];
          movieCollection.movieList.push({
            poster: item.poster,
            moviename: item.moviename,
            year: item.year,
            plot: item.plot,
            cost: item.cost,
            edit: item.edit
          });
        }
        const data = {
          columns: [
            {
              label: "Poster",
              field: "poster",
              sort: "asc",
              width: 150
            },
            {
              label: "Movie Name",
              field: "moviename",
              sort: "asc",
              width: 270
            },
            {
              label: "Year Of Release",
              field: "year",
              sort: "asc",
              width: 200
            },
            {
              label: "Plot",
              field: "plot",
              sort: "asc",
              width: 100
            },
            {
              label: "Cost",
              field: "cost",
              sort: "asc",
              width: 100
            },
            {
              label: "Edit",
              field: "edit",
              sort: "asc",
              width: 5
            }
          ],
          rows: movieCollection["movieList"]
        };
        this.setState({
          actorlist: data,
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleDelete(id) {
    this.setState({
      deleteLoader: true
    });
    const data = {
      id
    };
    var self = this;
    axios
      .post("/backend/deletemovie", data)
      .then(function(res) {
        self.handleFetch();
        self.setState({
          open: true,
          Message: "Delete Successfully"
        });
      })
      .catch(function(error) {
        self.setState({
          open: true,
          Message: "Try Again Later"
        });
      });
  }
  handleClose = () => {
    this.setState({
      openDialog: false,
      open: true,
      Message: "Updated Successfully"
    });

    this.handleFetch();
  };
  handleCloseSnack = () => {
    this.setState({
      open: false,
      Message: ""
    });
  };
  handleEdit = (id, poster, moviename, year, plot, cost) => {
    this.setState({
      openDialog: true,
      id,
      poster,
      moviename,
      year,
      plot,
      cost
    });
  };
  handleOpen = () => {
    this.setState({
      addDialog: true
    });
  };
  handleAddClose = () => {
    this.setState({
      addDialog: false
    });
    this.handleFetch();
  };
  render() {
    const { openDialog } = this.state;
    return (
      <Grid item style={{ marginTop: "100px", width: "90%", marginLeft: "5%" }}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.Message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleCloseSnack}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <DialogComponent
          head="Movie List"
          open={this.state.addDialog}
          handleOpen={this.handleOpen}
        />
        <UpdateDialog
          title="Add New Movie"
          name="New Movie"
          head="Movie List"
          open={this.state.addDialog}
          handleClose={this.handleAddClose}
        />
        <UpdateDialog
          title="Update Movie"
          name="Update Movie"
          head="Movie List"
          open={openDialog}
          handleClose={this.handleClose}
          id={this.state.id}
          poster={this.state.poster}
          moviename={this.state.moviename}
          cost={this.state.cost}
          year={this.state.year}
          plot={this.state.plot}
        />
        {this.state.isLoading && (
          <center>
            <CircularProgress />
          </center>
        )}
        <MDBDataTable
          order={["name", "asc"]}
          btn
          responsive
          searchLabel="Search for Movie"
          entriesLabel="Show entries"
          entries={20}
          entriesOptions={[5, 10, 15]}
          striped
          bordered
          hover
          data={this.state.actorlist}
        />
      </Grid>
    );
  }
}

export default MovieList;
