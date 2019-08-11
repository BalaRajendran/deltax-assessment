import React, { Component } from "react";
import PropTypes from "prop-types";
import { Styles } from "./HomePageStyle";
import TopNavBar from "./../../components/NavBars/TopNavBar";
import MovieList from "./../../components/MoviesList/MovieList";

class HomePage extends Component {
  render() {
    return <MovieList />;
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default HomePage;
