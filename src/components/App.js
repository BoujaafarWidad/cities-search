import React, { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import CitiesList from "./CitiesList/CitiesList";

class App extends Component {
  state = {
    departure: "",
    arrival: ""
  };
  _handleCityClicked = (city, departure) => {
    departure
      ? this.setState({ departure: city })
      : this.setState({ arrival: city });
  };
  render() {
    return (
      <div className="App">
        <div
          className="mx-auto"
          style={{ width: "415px", color: "white", marginTop: "1.5rem" }}
        >
          Quel est votre trajet ?
        </div>
        <SearchBar cityName={this.state.departure} departure />
        <SearchBar cityName={this.state.arrival} />
        <CitiesList cityClicked={this._handleCityClicked} />
      </div>
    );
  }
}

export default App;
