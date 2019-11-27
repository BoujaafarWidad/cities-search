import React, { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import CitiesList from "./CitiesList/CitiesList";

class App extends Component {
  state = {
    departure: "",
    arrival: "",
    inDeparture: true
  };
  _onDepartureInputChange = term => {
    this.setState({ departure: term, inDeparture: true }, () => {
      document.body.dispatchEvent(
        new CustomEvent("fetchDepartureSearchCities", {
          detail: term
        })
      );
    });
  };
  _onArrivalInputChange = term => {
    this.setState({ arrival: term, inDeparture: false }, () => {
      document.body.dispatchEvent(
        new CustomEvent("fetchArrivalSearchCities", {
          detail: term
        })
      );
    });
  };
  handleDepartureOnFocus = () => {
    this.setState({ inDeparture: true });
  };
  handleArrivalOnFocus = () => {
    this.setState({ inDeparture: false }, () => {
      document.body.dispatchEvent(
        new CustomEvent("fetchArrivalSuggestions", {
          detail: { departure: this.state.departure }
        })
      );
    });
  };
  _handleCityClicked = city => {
    this.state.inDeparture
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
        <SearchBar
          onFocus={this.handleDepartureOnFocus}
          onInputChange={this._onDepartureInputChange}
          value={this.state.departure}
        />
        <SearchBar
          onFocus={this.handleArrivalOnFocus}
          onInputChange={this._onArrivalInputChange}
          value={this.state.arrival}
        />
        <CitiesList
          inDeparture={this.state.inDeparture}
          departure={this.state.departure}
          cityClicked={this._handleCityClicked}
        />
      </div>
    );
  }
}

export default App;
