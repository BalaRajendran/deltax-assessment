import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import SelectComponent from "./../Dialog/Dialog";
import CommonDialogComponent from "./../CommonDialog/CommonDialog";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { Grid } from "@material-ui/core";
class ActorList extends Component {
  constructor(props) {
    super(props);
    this.state = { actorlist: [], isLoading: true, openDialog: false };
  }
  componentWillMount() {
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
        var employees = {
          accounting: []
        };
        for (var i in r) {
          var item = r[i];
          employees.accounting.push({
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
          rows: employees["accounting"]
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
    console.log("Balaji");
  };
  render() {
    const { openDialog } = this.state;
    return (
      <Grid item style={{ marginTop: "100px", width: "90%", marginLeft: "5%" }}>
        <SelectComponent
          title="Add New Actor"
          name="New Actor"
          head="Actor List"
        />
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
