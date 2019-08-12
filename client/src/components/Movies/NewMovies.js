import React from "react";
import Select from "react-dropdown-select";
import DateFnsUtils from "@date-io/date-fns";
import { storage } from "../../firebase";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
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
import SelectComponent from "../Dialog/Dialog";
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
      openDialog: false,
      values: [],
      name: "",
      nameerror: "",
      yearOfReleasing: new Date(),
      yearOfReleasingError: "",
      plot: "",
      plotError: "",
      valuesError: "",
      actorlist: [],
      isLoading: false,
      poster: "",
      posterError: "",
      posterProgress: "",
      image: null,
      submitMessage: "",
      posterLoading: ""
    };
  }
  componentWillMount() {
    axios
      .get("backend/newactor")
      .then(response => {
        let r = [];
        let l;
        for (var i = 0; i < response.data.length; i++) {
          l = {
            _id: response.data[i]._id,
            name: response.data[i].name
          };
          r.push(l);
        }
        this.setState({
          actorlist: r
        });
      })
      .catch(function(error) {
        console.log(error);
      });
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
  handleName = e => {
    if (e.target.value == "") {
      this.setState({ name: e.target.value, nameerror: "Enter Movie Name" });
    } else {
      this.setState({
        name: e.target.value,
        nameerror: ""
      });
    }
  };
  handleyearOfReleasing = year => {
    if (year == "") {
      this.setState({
        yearOfReleasing: year,
        yearOfReleasingError: "Select Year Of Releasing"
      });
    } else {
      this.setState({
        yearOfReleasing: year,
        yearOfReleasingError: ""
      });
    }
  };
  handleplot = e => {
    if (e.target.value == "") {
      this.setState({
        plot: e.target.value,
        plotError: "Plot is required"
      });
    } else {
      this.setState({
        plot: e.target.value,
        plotError: ""
      });
    }
  };
  handleValues = values => {
    this.setState({ values, valuesError: "" });
  };
  handlePoster = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({
        image,
        posterError: "Poster Uploading, After Uploading Click Save"
      }));
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          this.setState({ posterError: "Try Again Later" });
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              this.setState({ url, posterError: "Poster Uploaded" });
            });
        }
      );
    } else {
      this.setState({
        image: null,
        url: "",
        posterError: "Poster is required"
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let k = 1;
    this.setState({ isLoading: true });
    if (this.state.image == null) {
      this.setState({
        posterError: "Poster is Required"
      });
      k = 0;
    }
    if (
      this.state.posterError == "Poster Uploading, After Uploading Click Save"
    ) {
      this.setState({ submitMessage: "Wait few Seconds Image Uploading" });
      k = 0;
    }
    if (!this.state.name) {
      this.setState({ nameerror: "Enter Movie Name" });
      k = 0;
    } else if (!/^[a-zA-Z. ]{2,30}$/.test(this.state.name)) {
      this.setState({
        nameerror: "Invalid Movie Name"
      });
      k = 0;
    }
    if (!this.state.yearOfReleasing) {
      this.setState({
        yearOfReleasingError: "Select Year"
      });
      k = 0;
    }
    if (!this.state.plot) {
      this.setState({ plotError: "Enter Plot Name" });
      k = 0;
    } else if (!/^[a-zA-Z.,-=> ]{2,100}$/.test(this.state.plot)) {
      this.setState({
        plotError: "Invalid Plot Name"
      });
      k = 0;
    }
    if (this.state.values.length == 0) {
      this.setState({ valuesError: "Select Movie Cost" });
      k = 0;
    } else {
      this.setState({ valuesError: "" });
    }
    if (k == 1) {
      const data = {
        name: this.state.name,
        year: this.state.yearOfReleasing,
        plot: this.state.plot,
        poster: this.state.url,
        cost: this.state.values
      };
      var self = this;
      axios
        .post("/backend/newmovie", data)
        .then(function(res) {
          if (res.data == "done") {
            self.setState({
              values: [],
              name: "",
              nameerror: "",
              yearOfReleasing: new Date(),
              yearOfReleasingError: "",
              plot: "",
              plotError: "",
              valuesError: "",
              isLoading: false,
              poster: "",
              posterError: "",
              posterProgress: "",
              image: null,
              submitMessage: "Movie Added Successfully",
              posterLoading: ""
            });
          } else {
            self.setState({
              values: [],
              name: "",
              nameerror: "",
              yearOfReleasing: new Date(),
              yearOfReleasingError: "",
              plot: "",
              plotError: "",
              valuesError: "",
              isLoading: false,
              poster: "",
              posterError: "",
              image: null,
              submitMessage: "Something Went Wrong, Try Again Later",
              posterLoading: ""
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
    this.setState({ isLoading: false });
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
            left: "65%",
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
                      error={this.state.yearOfReleasingError}
                      margin="normal"
                      id="mui-pickers-date"
                      label="Year Of Release"
                      disableFuture
                      format="yyyy"
                      views={["year"]}
                      style={{ width: "100%" }}
                      value={this.state.yearOfReleasing}
                      onChange={this.handleyearOfReleasing}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </Grid>
                  {this.state.yearOfReleasingError && (
                    <Grid container style={{ paddingBottom: "10px" }}>
                      <Typography
                        align="center"
                        variant="subtitle2"
                        color="error"
                      >
                        {this.state.yearOfReleasingError}
                      </Typography>
                    </Grid>
                  )}
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <Grid container spacing={32} alignItems="flex-end">
              <Grid item md={true} sm={true} xs={true}>
                <TextField
                  value={this.state.plot}
                  error={this.state.plotError ? true : false}
                  helperText={this.state.plotError}
                  onChange={this.handleplot}
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
                {" "}
                Select Poster
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
                  value={this.state.poster}
                  onChange={this.handlePoster}
                />
                {this.state.posterError && (
                  <Grid container style={{ paddingBottom: "10px" }}>
                    <Typography
                      align="center"
                      variant="subtitle2"
                      color="error"
                    >
                      {this.state.posterError}
                    </Typography>
                  </Grid>
                )}
                <span class="file-custom" />
              </label>
            </Grid>
            <label
              className="file"
              style={{
                marginLeft: " 6px",
                marginTop: "0.5rem",
                width: "100%"
              }}
            >
              {" "}
              Select Cost
              <Select
                placeholder="Select Actors"
                addPlaceholder="Add More Actors"
                searchBy="name"
                searchable={true}
                dropdownHandle={true}
                dropdownHeight="300px"
                multi
                values={this.state.values}
                labelField="name"
                valueField="name"
                options={this.state.actorlist}
                onChange={this.handleValues}
                dropdownPosition="auto"
              />
              {this.state.valuesError && (
                <Grid container style={{ paddingBottom: "10px" }}>
                  <Typography align="center" variant="subtitle2" color="error">
                    {this.state.valuesError}
                  </Typography>
                </Grid>
              )}
            </label>
            <Grid
              container
              alignItems="center"
              style={{ marginTop: "15px" }}
              justify="space-between"
            />
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
                  "Save"
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
