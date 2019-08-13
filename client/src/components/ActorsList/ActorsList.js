import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import SelectComponent from "./../Dialog/Dialog";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { Grid, Typography, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors";
import UpdateDialog from "./../Dialog/Dialog";
import DialogComponent from "../Dialog/TitleComponent";
class ActorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorlist: [],
      isLoading: true,
      openDialog: false,
      addDialog: false,
      open: false,
      Message: "",
      id: "",
      name: "",
      dob: "",
      sex: "",
      bio: ""
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
                  onClick={this.handleEdit.bind(
                    this,
                    response.data[i]._id,
                    response.data[i].name,
                    response.data[i].dob,
                    response.data[i].sex,
                    response.data[i].bio
                  )}
                >
                  <Edit />
                </Button>
                {/* <Button
                  variant="contained"
                  className="delete"
                  disabled
                  style={{
                    backgroundColor: "#c9302c",
                    borderColor: "#ac2925",
                    color: "white"
                  }}
                  onClick={this.handleDelete.bind(this, response.data[i]._id)}
                >
                  <Delete />
                </Button> */}
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
              label: "Date Of Birth",
              field: "dob",
              sort: "asc",
              width: 500
            },
            {
              label: "Sex",
              field: "sex",
              sort: "asc",
              width: 270
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
  handleClose = () => {
    this.setState({
      openDialog: false,
      open: true,
      Message: "Updated Successfully"
    });
    this.handleFetch();
  };
  handleEdit = (id, name, dob, sex, bio) => {
    this.setState({
      openDialog: true,
      id,
      name,
      dob,
      sex,
      bio
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
        <DialogComponent
          head="Actor List"
          open={this.state.addDialog}
          handleOpen={this.handleOpen}
        />
        <UpdateDialog
          title="Add New Actor"
          name="New Actor"
          head="Actor List"
          open={this.state.addDialog}
          handleClose={this.handleAddClose}
        />
        <UpdateDialog
          title="Update Actor"
          name="Update Actor"
          head="Actor List"
          id={this.state.id}
          actorname={this.state.name}
          sex={this.state.sex}
          bio={this.state.bio}
          dob={this.state.dob}
          open={openDialog}
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
          entries={10}
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
