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
        this.setState({
          actorlist: response.data,
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // handleCall = () => {
  //   axios
  //     .get("backend/newactor")
  //     .then(response => {
  //       this.setState({
  //         actorlist: response.data
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };
  // handleClose = () => {
  //   this.setState({
  //     openDialog: false
  //   });
  // };
  // handleOpen = () => {
  //   alert("f");
  //   this.setState({
  //     openDialog: true
  //   });
  // };
  render() {
    const { openDialog } = this.state;
    function data(actorlist) {
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
          }
          // {
          //   label: "Edit",
          //   field: "edit",
          //   sort: "asc",
          //   width: 5
          // }
        ],
        rows: tabRow(actorlist)
      };
      return data;
    }
    function tabRow(actorlist) {
      let l;
      let r = [];
      for (var i = 0; i < actorlist.length; i++) {
        l = {
          name: actorlist[i].name,
          dob: actorlist[i].dob.substring(0, 10),
          sex: actorlist[i].sex,
          bio: actorlist[i].bio
          // edit: (
          //   <Button
          //     variant="contained"
          //     style={{
          //       backgroundColor: "#00c851",
          //       color: "white"
          //     }}
          //     id={actorlist[i]._id}
          //   >
          //     <Edit />
          //   </Button>
          // )
        };
        r.push(l);
      }
      console.log(r);
      var employees = {
        accounting: []
      };
      for (var i in r) {
        var item = r[i];
        employees.accounting.push({
          name: item.name,
          dob: item.dob,
          sex: item.sex,
          bio: item.bio
        });
      }
      return employees["accounting"];
    }
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
          fixed
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
          data={data(this.state.actorlist)}
        />
      </Grid>
    );
  }
}

export default ActorList;
