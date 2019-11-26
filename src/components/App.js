import React, { Component } from "react";
import SearchBar from "./SearchBar/SearchBar";
import CitiesList from "./CitiesList/CitiesList";

class App extends Component {
  state = {
    term: ""
  };
  _handleCityClicked = term => {
    this.setState({ term });
  };
  render() {
    console.log(this.state.term);
    return (
      <div className="App">
        <div
          className="mx-auto"
          style={{ width: "415px", color: "white", marginTop: "1.5rem" }}
        >
          Quel est votre trajet ?
        </div>
        <SearchBar cityName={this.state.term}/>
        <SearchBar cityName={this.state.term}/>
        <CitiesList cityClicked={this._handleCityClicked} />
      </div>
    );
  }
}

export default App;
