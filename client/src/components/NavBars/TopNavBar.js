import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { Styles } from "./TopNavBarStyles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  withStyles,
  SwipeableDrawer,
  IconButton,
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  Hidden,
  Toolbar,
  AppBar,
  Divider
} from "@material-ui/core";

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
  }
  handleButtonClick = (tabIndex, e) => {
    this.props.switchTab(tabIndex);
    this.setState({ left: false });
  };
  toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ [side]: open });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AppBar>
            <Toolbar onClick={this.toggleDrawer("left", true)}>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                className={classes.title}
                style={{ color: "#fff" }}
                variant="h6"
              >
                IMDB
              </Typography>
              <Hidden only={["xs"]}>
                <Grid container alignItems="center">
                  <Button className={classes.button} color="inherit">
                    Movies
                  </Button>
                  <Button className={classes.button} color="inherit">
                    Tv Shows
                  </Button>
                  <Button className={classes.button} color="inherit">
                    Celebrities
                  </Button>
                  <Button className={classes.button} color="inherit">
                    Watch List
                  </Button>
                </Grid>

                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Hidden>
            </Toolbar>
          </AppBar>
          <Hidden only={["sm", "lg", "md", "xl"]}>
            <SwipeableDrawer
              open={this.state.left}
              onClose={this.toggleDrawer("left", false)}
              onOpen={this.toggleDrawer("left", true)}
            >
              <div className={classes.list}>
                <List>
                  <ListItem className={classes.listtext} button>
                    <ListItemIcon>
                      <Avatar
                        alt="admin"
                        src={this.props.proPic}
                        className={classes.avatar}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"Admin"} />
                  </ListItem>
                  <Divider />

                  <div className={classes.listspace}>
                    <ListItem
                      className={classes.listtext}
                      button
                      onClick={this.handleButtonClick.bind(this, 1)}
                    >
                      <img
                        className={classes.iconcolor}
                        alt="Help"
                        src={"/assets/images/help.png"}
                      />
                      <ListItemText primary="Home" />
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem
                      className={classes.listtext}
                      button
                      onClick={this.handleButtonClick.bind(this, 5)}
                    >
                      <img
                        className={classes.iconcolor}
                        alt="Help"
                        src={"/assets/images/help.png"}
                      />
                      <ListItemText primary="About" />
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem
                      className={classes.listtext}
                      button
                      onClick={this.handleButtonClick.bind(this, 7)}
                    >
                      <img
                        className={classes.iconcolor}
                        alt="Help"
                        src={"/assets/images/help.png"}
                      />
                      <ListItemText primary="Treatment" />
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem
                      className={classes.listtext}
                      button
                      onClick={this.handleButtonClick.bind(this, 6)}
                    >
                      <img
                        className={classes.iconcolor}
                        alt="Help"
                        src={"/assets/images/help.png"}
                      />
                      <ListItemText primary="Faq" />
                    </ListItem>
                    <Divider className={classes.divider} />
                    <ListItem
                      className={classes.listtext}
                      button
                      onClick={this.handleButtonClick.bind(this, 3)}
                    >
                      <img
                        className={classes.iconcolor}
                        alt="Help"
                        src={"/assets/images/help.png"}
                      />
                      <ListItemText primary="Contact" />
                    </ListItem>
                    <Divider className={classes.divider} />
                  </div>
                </List>
              </div>
            </SwipeableDrawer>
          </Hidden>
        </div>
      </div>
    );
  }
}

TopNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Styles)(TopNavBar);
