import React from 'react';
import {  BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";
import View from './components/View';
import List from './components/List';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './logo.png';

// requirements:
/**
 * There should be a list of all notes.
 * You should be able to add a note.
 * You should be able to edit a note.
 * The notes should be persisted and retrieved via a service.
 * You should be able to go straight to a note if specified in the url.
 */

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <img src={logo} alt="Notes App"/> Notes App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Notes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/notes"><List /></Route>
          <Route exact path="/:id" component={View} />
          <Route  path="/"><List /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
