import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import AUTH from "./utils/AUTH";
import Navbar from "./components/NavBar";

function App() {
  
    const [userObject, setuserObject] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",       
      })
    const [loggedIn, setloggedIn] = useState(false)
  
	useEffect(() => {
		AUTH.getUser().then(response => {
			console.log(response.data);		
		});
	})

	const logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log('successfully logged out!');
			console.log(response.status);
            if (response.status === 200) {
                setloggedIn(false)
                setuserObject(null);				
			}

		});
	}

	const login = (username, password) => {
	  AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}


		return (
		<div className="App">
        {loggedIn && (
          <div>
            <Navbar user={userObject} logout={logout} />
            <Header />
            <div className="main-view">
				  <Switch>
                <Route exact path="/" component={() => <Search user={userObject}/>} />
                <Route exact path="/saved" component={() => <Saved user={userObject}/>} />                
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        { !loggedIn && (
           <div>
           <Navbar user={userObject} logout={logout} />
            <Header />             
          <div className="auth-wrapper" style={{paddingTop:40}}>
            <Route exact path="/" component={Login} />           
            <Route exact path="/Signup" component={Signup} /> 
          </div>
          </div>             
        )}
		</div>
		)
	
}

export default App;
