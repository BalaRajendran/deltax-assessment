// import React from "react";
// import { withStyles, Grid } from "@material-ui/core";

// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
// });

// class Tabcontainer extends React.Component {
//   render() {
//     const { classes } = this.props;
//     return (
//       <Grid container className={classes.root} direction="column">

//       </Grid>
//     );
//   }
// }

// export default withStyles(styles)(Tabcontainer);
import React from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { styles } from "./Containerstyles";
import { Link } from "react-router-dom";

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

class LoginTab extends React.Component {
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
      <Paper>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.padding}>
            <div className={classes.margin}>
              <Grid container spacing={32} alignItems="flex-end">
                <Grid item md={true} sm={true} xs={true}>
                  <TextField
                    id="moviename"
                    label="Movie Name"
                    type="text"
                    variant="outlined"
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
                    variant="outlined"
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
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginTab);
