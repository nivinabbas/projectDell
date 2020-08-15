import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./view/components/header/Header";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ModificationByField from "./view/components/header/ModificationByField";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Switch>
          <Link to="/header">
            <Route exact path="/">
              <Header />
            </Route>
          </Link>
          <Link to="/modification">
            <Route>
              <ModificationByField />
            </Route>
          </Link>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
