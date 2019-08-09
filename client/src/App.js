import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/HomePage/HomePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/tvshows" component={Home} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}
export default App;
