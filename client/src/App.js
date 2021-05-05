// import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";

import NoMatch from "./pages/NoMatch";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
// import Login from "./pages/LoginForm";
// import Logout from "./pages/Logout";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AUTH from "./utils/AUTH";
function App() {
 
  const [userState, setuserState] = useState({
    loggedIn: false,
		user: null
  })
  
  useEffect() => {
    AUTH.getUser().then(response => {
      console.log(response.daata)
    })
  }

    return (
      <Router>
        <div className="mainpage">
          <NavBar />
          <Header />
          <Wrapper>
            <Route exact path="/" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <Route exact path="/Signup" component={Signup} /> 
            <Route exact path="/noMatch" component={NoMatch} />
          </Wrapper>
        </div>      </Router>
    )
  
};

export default App;
