
import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../components/AppContext';

import Card from "../../components/Card";

// import Input from "../../Input";
import { Input, FormBtn } from '../../components/FormSignup';
import AUTH from '../../utils/AUTH';
function Login() {

  const myContext = useContext(AppContext);

    const [userObject, setuserObject] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        redirectTo: ""
      })

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setuserObject({
            ...userObject,
            [name]: value
        })
    };

  const handleFormSubmit = event => {
      console.log("Inside login form submit: ", userObject)
        event.preventDefault();
        if (userObject.email && userObject.password) {
          AUTH.login({
            email: userObject.email,
            password: userObject.password
          })
            .then(res => {
              console.log(res.user.email);
              myContext.user.firstName = res.user.firstName;
              myContext.user.lastName = res.user.lastName;
              myContext.user.email = res.user.email;
              myContext.user.password = res.user.password;
              console.log("mycontext user after login: ", myContext.user)
              // window.location.href = '/search'
            })               
        }
  };
  
  useEffect(() => {   
      
    console.log("mycontect variables registreed: ", myContext.registeredUser);
    console.log("mycontect variables registreed: ", myContext.user);
    
    }, []);

    return (
        <div className="login">
        <div className="container zindex1">
          <div className="row zindex1">
            <div className="col-md-3 zindex1"></div> 
            <div className="col-md-6 zindex1" >
              <Card className="zindex1" title="Welcome to mycookbook">
                <form className="zindex1" style={{marginTop: 10}}>
                  <h1>Login to mycookbook!</h1>
                  
                  <label htmlFor="email">email: </label>
                  <Input
                    type="text"
                    name="email"
                    value={userObject.email}
                    onChange={handleChange}
                    // onChange={myContext.setUser}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={userObject.password}
                    onChange={handleChange}
                    // onChange={myContext.setUser}
                  />
                  
                  <Link to="/">Signup</Link>
                  <FormBtn onClick={handleFormSubmit}>login</FormBtn>
                </form>
              </Card>            
              </div>
          </div>
        </div>
        
        </div>
     )
}
export default Login