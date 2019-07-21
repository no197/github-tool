import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./component/layout/NavBar";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import User from "./component/users/User";
import NotFound from "./component/pages/NotFound";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/alertState";

import "./App.css";
import "./animate.css";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
