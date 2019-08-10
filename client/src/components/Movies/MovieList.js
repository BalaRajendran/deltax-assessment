import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
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
class Testcase extends Component {
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
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  render() {
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
          field: "yearofrelease",
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
          width: 150
        },
        {
          label: "Edit",
          field: "edit",
          sort: "asc",
          width: 5
        }
      ],
      rows: [
        {
          poster: (
            <img
              src="http://getfyt.co.in/website/img/logo/icon.png"
              style={{ width: "100px" }}
            />
          ),
          moviename: "System Architect",
          yearofrelease: "Edinburgh",
          plot: "61",
          cost: "2011/04/25",
          edit: (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#00c851",
                color: "white"
              }}
            >
              <Edit />
            </Button>
          )
        }
      ]
    };
    return (
      <Grid item style={{ marginTop: "100px" }}>
        <SelectComponent />
        <MDBDataTable
          fixed
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
          data={data}
        />
      </Grid>
    );
  }
}

export default Testcase;
