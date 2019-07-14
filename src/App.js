import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./component/layout/NavBar";
import Users from "./component/users/Users";
import Alert from "./component/layout/Alert";
import "./App.css";
import "./animate.css";
import Search from "./component/users/Search";
import About from "./component/pages/About";
import User from "./component/users/User";

class App extends Component {
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null,
  };

  handleOnSearchUsers = async text => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: data.items, loading: false });
  };

  handleOnGetGithubUser = async username => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: data, loading: false });
  };

  handleOnGetUserRepos = async username => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: data, loading: false });
  };

  handleOnClearUsers = () => {
    this.setState({ users: [], clear: false });
  };

  handleOnSearchAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    <Alert alert={alert} />
                    <Search
                      showClear={users.length > 0}
                      searchUsers={this.handleOnSearchUsers}
                      clearUsers={this.handleOnClearUsers}
                      setAlert={this.handleOnSearchAlert}
                    />
                    <Users users={users} loading={loading} />
                  </React.Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.handleOnGetGithubUser}
                    user={user}
                    getUserRepos={this.handleOnGetUserRepos}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
