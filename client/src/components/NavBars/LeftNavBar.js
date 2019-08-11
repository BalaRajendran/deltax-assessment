import React from "react";
import { Grid, withStyles, Avatar, IconButton } from "@material-ui/core";
import { Styles } from "./LeftNavBarStyles";

class LeftNavBar extends React.Component {
  handleButtonClick = (tabIndex, e) => {
    this.props.switchTab(tabIndex);
  };

  render() {
    const { classes, proPic, selTab } = this.props;
    let isSelect = {
      movie: "unset",
      tvshows: "unset",
      celebrities: "unset",
      watchlist: "unset",
      actorlist: "unset"
    };
    var pathArray2 = window.location.href;
    var pathArray1 = pathArray2.split("/");
    pathArray1 = pathArray1.reverse();
    switch (pathArray1[0]) {
      case "movie":
        isSelect.movie = "#423bbf";
        break;
      case "tvshows":
        isSelect.tvshows = "#423bbf";
        break;
      case "actorlist":
        isSelect.actorlist = "#423bbf";
        break;
      case "celebrities":
        isSelect.celebrities = "#423bbf";
        break;
      case "watchlist":
        isSelect.watchlist = "#423bbf";
        break;
      default:
        isSelect.movie = "#423bbf";
        break;
    }
    return (
      <Grid
        container
        className={classes.container}
        direction="column"
        style={{ padding: "0px" }}
        justify="space-between"
        alignItems="center"
      >
        <Grid item style={{ marginTop: 30 }}>
          <IconButton style={{ padding: "0px" }}>
            <Avatar
              alt="Profile"
              title="Profile"
              src={proPic}
              className={classes.bigAvatar}
            />
          </IconButton>
          <Grid container direction="column" style={{ marginTop: 80 }}>
            <Grid
              item
              container
              direction="column"
              spacing={16}
              alignContent="center"
              justify="center"
            >
              <Grid item style={{ backgroundColor: isSelect.home }}>
                <IconButton onClick={this.handleButtonClick.bind(this, 1)}>
                  <img
                    className={classes.iconcolor}
                    alt="UserStories"
                    title="UserStories"
                    src={"/assets/images/userstories.png"}
                  />
                </IconButton>
              </Grid>
              <Grid item style={{ backgroundColor: isSelect.testcase }}>
                <IconButton onClick={this.handleButtonClick.bind(this, 2)}>
                  <img
                    className={classes.iconcolor}
                    alt="Testcase"
                    title="Testcase"
                    src={"/assets/images/testcase.png"}
                  />
                </IconButton>
              </Grid>
              <Grid item style={{ backgroundColor: isSelect.help }}>
                <IconButton onClick={this.handleButtonClick.bind(this, 3)}>
                  <img
                    className={classes.iconcolor}
                    alt="Help"
                    title="Help"
                    src={"/assets/images/help.png"}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ backgroundColor: isSelect.settings }}>
          <IconButton
            className={classes.iconcolor}
            onClick={this.handleButtonClick.bind(this, 4)}
          >
            <img
              className={classes.iconcolor}
              alt="Settings"
              title="Settings"
              src={"/assets/images/settings.png"}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(Styles)(LeftNavBar);
