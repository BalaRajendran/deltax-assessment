import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/MoviePage/MoviePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TopNavBar from "./components/NavBars/TopNavBar";
import ActorList from "./screens/Actor/Actor";
import { withStyles, Grid, Hidden } from "@material-ui/core";
import { Styles } from "./AppStyle";
const theme = createMuiTheme(require("./theme.json"));

class NotFound extends Component {
  render() {
    return (
      <center style={{ marginTop: "300px" }}>
        <h2>Not Found Go to Home page</h2>
      </center>
    );
  }
}

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container direction="column">
            <Grid item container xs={1}>
              <TopNavBar />{" "}
            </Grid>{" "}
            <Grid item xs>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/actorlist" component={ActorList} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </Grid>{" "}
          </Grid>{" "}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default withStyles(Styles)(App);
