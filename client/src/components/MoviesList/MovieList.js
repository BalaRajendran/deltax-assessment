import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress
} from "@material-ui/core";
import LazyLoad from "react-lazy-load";
import axios from "axios";
import Edit from "@material-ui/icons/Edit";
import SelectComponent from "./../Dialog/Dialog";
import {
  MDBBtn,
  MDBTable,
  MDBDataTable,
  MDBTableBody,
  MDBTableHead
} from "mdbreact";
import { withStyles, Grid, Hidden } from "@material-ui/core";
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { actorlist: [], isLoading: true, openDialog: false };
  }
  componentWillMount() {
    axios
      .get("backend/movielist")
      .then(response => {
        let l;
        let r = [];
        for (var i = 0; i < response.data.length; i++) {
          l = {
            moviename: response.data[i].moviename,
            year: response.data[i].year.substring(0, 10),
            plot: response.data[i].plot,
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
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#00c851",
                  color: "white"
                }}
                id={response.data[i]._id}
                onClick={this.handleEdit}
              >
                <Edit />
              </Button>
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
  handleEdit = () => {
    alert("f");
  };
  render() {
    return (
      <Grid item style={{ marginTop: "100px", width: "90%", marginLeft: "5%" }}>
        <SelectComponent
          title="Add New Movie"
          name="Add movie"
          head="Movie List"
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
