import React, { Component } from "react";
import "./assets/css/index.css";

class SearchBar extends Component {
  state = {
    term: "",
    cities: []
  };
  // componentWillUpdate = (nextProps, nextState) => {
  //   this.setState({ term: nextProps.cityName });
  // };
  handleOnInputChange = term => {
    this.props.onInputChange(term);
  };
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
                onFocus={this.props.onFocus}
                placeholder="search ..."
                onChange={event => this.handleOnInputChange(event.target.value)}
                name="search"
                value={this.props.value}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
