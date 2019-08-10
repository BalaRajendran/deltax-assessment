import React, { Fragment } from "react";
import {
  Input,
  FormLabel,
  withStyles,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Typography
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import Styles from "./NewActorsStyles";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

class NewMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedValue: "Male",
      isLoading: false,
      name: "",
      nameerror: "",
      gender: "",
      dob: "",
      doberror: "",
      gendererror: "",
      bio: "",
      bioerror: ""
    };
  }
  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };
  handleChange = event => {
    this.setState({
      selectedValue: event.target.value
    });
  };
  handleName = e => {
    if (e.target.value == "") {
      this.setState({ name: e.target.value, nameerror: "Enter Actor Name" });
    } else {
      this.setState({
        name: e.target.value,
        nameerror: ""
      });
    }
  };
  handleBio = e => {
    if (e.target.value == "") {
      this.setState({ bio: e.target.value, bioerror: "Enter Actor Bio" });
    } else {
      this.setState({
        bio: e.target.value,
        bioerror: ""
      });
    }
  };
  handleSubmit = () => {
    this.setState({ isLoading: true });
  };
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          paddingBottom: "20px",
          width: "100%",
          overflowX: "hidden"
        }}
      >
        <div className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  id="name"
                  label="Name"
                  type="text"
                  value={this.state.name}
                  error={this.state.nameerror ? true : false}
                  helperText={this.state.nameerror}
                  onChange={this.handleName}
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
            </Grid>
            <div>
              <FormLabel style={{ marginTop: "20px" }} component="legend">
                Gender
              </FormLabel>
              <Grid>
                <label>Male</label>
                <GreenRadio
                  checked={this.state.selectedValue === "Male"}
                  onClick={e => this.setState({ selectedValue: "Male" })}
                  value="Male"
                  name="sex"
                  inputProps={{ "aria-label": "A" }}
                />
                <label>Female</label>
                <GreenRadio
                  checked={this.state.selectedValue === "Female"}
                  onClick={e => this.setState({ selectedValue: "Female" })}
                  value="Female"
                  name="sex"
                  inputProps={{ "aria-label": "B" }}
                />
                <label>Others</label>
                <GreenRadio
                  checked={this.state.selectedValue === "Others"}
                  onClick={e => this.setState({ selectedValue: "Others" })}
                  value="others"
                  name="sex"
                  inputProps={{ "aria-label": "C" }}
                />
              </Grid>
            </div>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    className={classes.grid}
                    justify="space-around"
                    style={{ width: "100%" }}
                  >
                    <KeyboardDatePicker
                      margin="normal"
                      id="mui-pickers-date"
                      label="Date Of Birth"
                      style={{ width: "100%" }}
                      value={this.state.selectedDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="required"
                label="Bio"
                placeholder="About the Actors"
                margin="normal"
                className={classes.textField}
                style={{ width: "100%" }}
                value={this.state.bio}
                error={this.state.bioerror ? true : false}
                helperText={this.state.bioerror}
                onChange={this.handleBio}
              />
            </Grid>
            {/* {submitMessage && (
              <Grid
                container
                justify="center"
                style={{ paddingBottom: "10px" }}
              >
                <Typography align="center" variant="subtitle2" color="error">
                  {submitMessage}
                </Typography>
              </Grid>
            )} */}
            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                className={classes.button}
                disabled={this.state.isLoading}
                color="primary"
                onClick={this.handleSubmit}
              >
                {this.state.isLoading ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  "Done"
                )}
              </Button>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(Styles)(NewMovies);
