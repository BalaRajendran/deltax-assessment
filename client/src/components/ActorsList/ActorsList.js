import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import SelectComponent from "./../Dialog/Dialog";
import CommonDialogComponent from "./../Dialog/Dialog";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors";
class ActorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorlist: [],
      isLoading: true,
      openDialog: false,
      open: false,
      Message: ""
    };
  }
  componentWillMount() {
    this.handleFetch();
  }
  handleFetch() {
    axios
      .get("backend/newactor")
      .then(response => {
        let l;
        let r = [];
        for (var i = 0; i < response.data.length; i++) {
          l = {
            name: response.data[i].name,
            dob: response.data[i].dob.substring(0, 10),
            sex: response.data[i].sex,
            bio: response.data[i].bio,
            edit: (
              <div style={{ display: "flex" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#00c851",
                    color: "white"
                  }}
                  onClick={this.handleEdit.bind(this, response.data[i]._id)}
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
                  onClick={this.handleDelete.bind(this, response.data[i]._id)}
                >
                  <Delete />
                </Button>
              </div>
            )
          };
          r.push(l);
        }
        var actorsList = {
          actors: []
        };
        for (var i in r) {
          var item = r[i];
          actorsList.actors.push({
            name: item.name,
            dob: item.dob,
            sex: item.sex,
            bio: item.bio,
            edit: item.edit
          });
        }
        const data = {
          columns: [
            {
              label: "Actor Name",
              field: "name",
              sort: "asc",
              width: 150
            },
            {
              label: "Sex",
              field: "sex",
              sort: "asc",
              width: 270
            },
            {
              label: "Date Of Birth",
              field: "dob",
              sort: "asc",
              width: 200
            },
            {
              label: "Bio",
              field: "bio",
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
          rows: actorsList["actors"]
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
  handleEdit = id => {
    console.log(id);
  };
  handleDelete(id) {
    this.setState({
      deleteLoader: true
    });
    const data = {
      id
    };
    var self = this;
    axios
      .post("/backend/deleteactor", data)
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
  handleCloseSnack = () => {
    this.setState({
      open: false,
      Message: ""
    });
  };
  render() {
    const { openDialog } = this.state;
    return (
      <Grid item style={{ marginTop: "100px", width: "90%", marginLeft: "5%" }}>
        {this.state.Message && (
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
        )}
        {/* <SelectComponent
          title="Add New Actor"
          name="New Actor"
          head="Actor List"
        /> */}
        <CommonDialogComponent
          title="Add New Actor"
          name="New Actor"
          head="Actor List"
          openDialog={this.state.openDialog}
          handleClose={this.handleClose}
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
          searchLabel="Search for Actors"
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

export default ActorList;
