import React from "react";
import {
  Input,
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  CircularProgress,
  InputLabel,
  Typography
} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Tick from "./images/checked.png";
import hobbies from "./HobbiesObj";
import SelectComponent from "./../NewMovieDialog/NewMovieDialog";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: "95px",
    width: "95px",
    justify: "center"
  },
  control: {
    padding: theme.spacing.unit
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "50%",
    maxHeight: "50%"
  }
});

class NewMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false
    };
  }
  handleClose1 = () => {
    this.setState({
      openDialog: false
    });
  };
  handleOpen1 = () => {
    this.setState({
      openDialog: true
    });
  };
  // this.updateTextField = this.updateTextField.bind(this);
  // this.handleClick = this.handleClick.bind(this);
  // this.handleChange = this.handleChange.bind(this);
  state = {
    spacing: "16",
    overlay: false,
    opacityVal: "0.5",
    display: "none",
    displaytick: "none"
  };
  render() {
    const {
      classes,
      email,
      password,
      isRemember,
      emailError,
      passwordError,
      isLoading,
      submitMessage
    } = this.props;
    let emErr, passErr;
    if (emailError) {
      emErr = true;
    } else {
      emErr = false;
    }

    if (passwordError) {
      passErr = true;
    } else {
      passErr = false;
    }
    return (
      <div
        style={{
          paddingBottom: "20px",
          width: "100%",
          overflowX: "hidden"
        }}
      >
        <SelectComponent
          title="Add New Actor"
          name="New Actor"
          head="Actor List"
          openDialog={this.state.openDialog}
          handleClose={this.handleClose1}
        />
        <Button
          variant="contained"
          style={{
            left: "80%",
            backgroundColor: "#00c851",
            color: "white"
          }}
          onClick={this.handleOpen1}
        >
          <Add />
          Add New Actor
        </Button>
        <div className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="moviename"
                  label="Movie Name"
                  type="text"
                  // variant="outlined"
                  value={email}
                  error={emErr}
                  helperText={emailError}
                  onChange={this.handleEmail}
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="year"
                  label="Year Of Release"
                  type="text"
                  // variant="outlined"
                  value={password}
                  error={passErr}
                  helperText={passwordError}
                  onChange={this.handlePassword}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="plot"
                  label="Plot"
                  rowsMax="5"
                  rows="3"
                  type="text"
                  fullWidth
                  required
                  id="standard-textarea"
                  label="Plot"
                  placeholder="Somthing about the Movie"
                  multiline
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="cost"
                  label="Cost"
                  type="text"
                  fullWidth
                  required
                  id="standard-textarea"
                  label="Cost"
                  placeholder="Somthing about the Movie"
                  className={classes.textField}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <label
                className="file"
                style={{
                  marginLeft: " 6px",
                  marginTop: "0.5rem",
                  width: "100%"
                }}
              >
                <input
                  margin="normal"
                  className={classes.textField}
                  style={{
                    marginLeft: " 6px",
                    marginTop: "0.5rem",
                    width: "100%"
                  }}
                  type="file"
                  id="file"
                  aria-label="File browser example"
                />
                <span class="file-custom" />
              </label>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="required"
                label="Cost"
                placeholder="Somthing about the Movie"
                margin="normal"
                className={classes.textField}
                style={{ width: "100%" }}
                onChange={e => {
                  this.handleChange(e);
                  this.updateTextField(e);
                }}
              />
            </Grid>
            <Grid
              container
              alignItems="center"
              style={{ marginTop: "15px" }}
              justify="space-between"
            />
            {submitMessage && (
              <Grid
                container
                justify="center"
                style={{ paddingBottom: "10px" }}
              >
                <Typography align="center" variant="subtitle2" color="error">
                  {submitMessage}
                </Typography>
              </Grid>
            )}
            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                className={classes.button}
                disabled={isLoading}
                color="primary"
                onClick={this.handleSubmit}
              >
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewMovies);
