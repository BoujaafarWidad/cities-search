import React, { Component } from "react";
import axios from "axios";

class CitiesList extends Component {
  state = {
    topCities: [],
    cities: []
  };
  componentDidMount = () => {
    axios.get("https://api.comparatrip.eu/cities/popular/5 ").then(res => {
      this.setState({ topCities: res.data });
    });
    document.body.addEventListener(
      "fetchDepartureSearchCities",
      this._updateCities
    );
    document.body.addEventListener(
      "fetchArrivalSearchCities",
      this._updateCities
    );
    document.body.addEventListener(
      "fetchArrivalSuggestions",
      this.suggestCities
    );
  };

  componentWillUnmount = () => {
    document.body.removeEventListener(
      "fetchDepartureSearchCities",
      this._updateCities
    );
    document.body.removeEventListener(
      "fetchArrivalSearchCities",
      this._updateCities
    );
    document.body.removeEventListener(
      "fetchArrivalSuggestions",
      this.suggestCities
    );
  };
  suggestCities = event => {
    axios
      .get(
        `https://api.comparatrip.eu/cities/popular/from/${event.detail.departure}/5`
      )
      .then(res => {
        this.setState({ cities: res.data });
      });
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
    }
  };
  returnCities = (cities, topCities) => {
    let citiesShown = !cities.length ? topCities : cities;
    return citiesShown.slice(0, 5).map((item, key) => {
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
