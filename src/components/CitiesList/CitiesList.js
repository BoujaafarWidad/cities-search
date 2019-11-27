import React, { Component } from "react";
import axios from "axios";

class CitiesList extends Component {
  state = {
    topCities: [],
    cities: [],
    topDestination: []
  };
  componentDidMount = () => {
    axios.get("https://api.comparatrip.eu/cities/popular/5 ").then(res => {
      this.setState({ topCities: res.data });
    });
    document.body.addEventListener("fetchSearchCities", this._updateCities);
  };
  componentWillUnmount = () => {
    document.body.removeEventListener("fetchSearchCities", this._updateCities);
  };

  _updateCities = event => {
    if (event.detail) {
      axios
        .get(
          `https://api.comparatrip.eu/cities/autocomplete/?q=${event.detail}`
        )
        .then(res => {
          this.setState({ cities: res.data });
        });
    } else {
      this.setState({ cities: [] });
      axios
        .get(
          `https://api.comparatrip.eu/cities/popular/from/${this.state.cities.unique_name}/5`
        )
        .then(res => {
          this.setState({ topDestination: res.data });
          console.log(this.state.topDestination);
        });
    }
  };
  returnCities = (cities, topCities) => {
    let citiesShown = !cities.length ? topCities : cities;
    return citiesShown.map((item, key) => {
      return (
        <li
          className="list-group-item"
          key={key}
          onClick={() => {
            this._handleClick(item.unique_name);
          }}
        >
          {item.local_name}
        </li>
      );
    });
  };
  _handleClick = name => {
    this.props.cityClicked(name);
  };
  render() {
    console.log(this.state.cities);
    return (
      <div className="mx-auto" style={{ width: "415px", cursor: "pointer" }}>
        <ul className="list-group">
          {this.returnCities(this.state.cities, this.state.topCities)}
        </ul>{" "}
      </div>
    );
  }
}
export default CitiesList;
