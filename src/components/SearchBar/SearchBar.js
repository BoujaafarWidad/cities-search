import React, { Component } from "react";
import "./assets/css/index.css";

class SearchBar extends Component {
  state = {
    term: "",
    cities: []
  };
  onInputChange(term) {
    this.setState({ term }, () => {
      document.body.dispatchEvent(
        new CustomEvent("fetchSearchCities", {
          detail: term
        })
      );
    });
  }
  _handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this._handleSubmit}>
          <div className="container-search-bar">
            <div className="search-bar">
              <input
                placeholder="search ..."
                onChange={event => this.onInputChange(event.target.value)}
                name="search"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
