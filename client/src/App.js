// import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Route, Switch } from 'react-router-dom';
import AppContext from './components/AppContext';
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
import Logout from "./pages/Logout";
import AUTH from "./utils/AUTH";

function App() {  
    const [userObject, setuserObject] = useState({
        firstName: "test",
        lastName: "test",
        email: "test@abc.com",
        password: "",       
      })
    const [loggedIn, setloggedIn] = useState(false);    
    const setUser = () => {


    }   
    const userState = {
        logged: loggedIn,
        user: userObject,
        setuserObject,
        setloggedIn
    }  

      return (
      <AppContext.Provider value={userState}>
      <Router>
        <div className="mainpage">
          <NavBar />
          <Header />
          <Wrapper>
            <Route exact path="/" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <Route exact path="/Signup" component={Signup} /> 
            <Route exact path="/logout" component={Logout} />
          </Wrapper>
        </div>
        </Router>
        </AppContext.Provider> 
  )
  
     
};

export default App;
// export default userState(App, userState);
