import React, { Fragment } from "react";
import axios from "axios";
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

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);
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
class UpdateMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      selectedValue: "Male",
      isLoading: false,
      name: "",
      nameerror: "",
      gender: "",
      doberror: "",
      gendererror: "",
      bio: "",
      bioerror: "",
      submitMessage: ""
    };
  }
  componentWillMount() {
    var a = this.props.dob;
    this.setState({
      selectedDate: new Date(a.slice(0, 4), a.slice(8, 10) - 1, a.slice(5, 7)),
      selectedValue: this.props.sex,
      isLoading: false,
      name: this.props.name,
      bio: this.props.bio
    });
  }
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
  handleSex = e => {
    this.setState({
      selectedValue: e.target.value
    });
  };
  handleDateChange = date => {
    if (date == new Date()) {
      this.setState({
        selectedDate: date,
        doberror: "Enter Correct Date Of Birth"
      });
    } else {
      this.setState({
        selectedDate: date,
        doberror: ""
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
  handleSubmit = e => {
    e.preventDefault();
    let k = 1;
    this.setState({ isLoading: true });
    if (!this.state.name) {
      this.setState({ nameerror: "Enter Name" });
      k = 0;
    } else if (!/^[a-zA-Z. ]{2,50}$/.test(this.state.name)) {
      this.setState({
        nameerror: "Invalid Actor Name"
      });
      k = 0;
    }
    if (this.state.selectedDate.getDate() === new Date().getDate()) {
      this.setState({ doberror: "Invalid Date" });
      k = 0;
    }

    if (!this.state.bio) {
      this.setState({ bioerror: "Enter Name" });
      k = 0;
    } else if (!/^[a-zA-Z,-=>. ]{3,500}$/.test(this.state.bio)) {
      this.setState({
        bioerror: "Invalid Actor Bio"
      });
      k = 0;
    }
    if (k == 1) {
      const data = {
        name: this.state.name,
        sex: this.state.selectedValue,
        dob: this.state.selectedDate,
        bio: this.state.bio,
        _id: this.props._id
      };
      console.log(data);
      var self = this;
      axios
        .post("/backend/updateactor", data)
        .then(function(res) {
          if ("done" == res.data) {
            self.setState({
              isLoading: false,
              submitMessage: "Actors Updated Successfully"
            });
          } else {
            self.setState({
              isLoading: false,
              submitMessage: "Something Went Wrong",
              selectedDate: new Date(),
              selectedValue: "Male",
              name: "",
              nameerror: "",
              gender: "",
              doberror: "",
              gendererror: "",
              bio: "",
              bioerror: ""
            });
          }
        })
        .catch(function(error) {
          this.setState({
            isLoading: false,
            submitMessage: "Something Went Wrong"
          });
        });
    } else {
      this.setState({ isLoading: false });
    }
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
        <form>
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
                        error={this.state.doberror}
                        margin="normal"
                        id="mui-pickers-date"
                        label="Date Of Birth"
                        disableFuture
                        format="yyyy/MM/dd"
                        style={{ width: "100%" }}
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </Grid>
                    {this.state.doberror && (
                      <Grid container style={{ paddingBottom: "10px" }}>
                        <Typography
                          align="center"
                          variant="subtitle2"
                          color="error"
                        >
                          {this.state.doberror}
                        </Typography>
                      </Grid>
                    )}
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
              {this.state.submitMessage && (
                <Grid
                  container
                  justify="center"
                  style={{ paddingBottom: "10px" }}
                >
                  <Typography align="center" variant="subtitle2" color="error">
                    {this.state.submitMessage}
                  </Typography>
                </Grid>
              )}
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
                    "Update"
                  )}
                </Button>
              </Grid>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(UpdateMovies);
