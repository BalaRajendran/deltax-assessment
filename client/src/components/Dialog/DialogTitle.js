import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles, Grid } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
class DialogTitle extends React.Component {
    render() {
        return ( <
            Grid >
            <
            Typography variant = "h6"
            style = {
                { display: "inline", marginLeft: "20px" } } >
            { this.props.head } <
            /Typography> <
            Button variant = "contained"
            style = {
                {
                    left: "80%",
                    backgroundColor: "#00c851",
                    color: "white"
                }
            }
            onClick = { this.props.handleOpen } >
            <
            Add / > { this.props.name } <
            /Button> <
            /Grid>
        );
    }
}

export default DialogTitle;