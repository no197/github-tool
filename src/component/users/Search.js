import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Search extends Component {
  state = {
    text: "",
  };

  handleOnChange = event => {
    const { value: text } = event.target;
    this.setState({ text });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.text.length) {
      this.props.setAlert("Please enter somthing", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            name="text"
            id=""
            placeholder="Search user..."
            autoComplete="off"
            value={this.state.text}
            onChange={this.handleOnChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block "
          />
        </form>
        {this.props.showClear && (
          <button
            onClick={this.props.clearUsers}
            className="btn btn-light btn-block"
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}
