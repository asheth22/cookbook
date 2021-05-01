
import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import Card from "../../components/Card";
// import Input from "../../Input";
import { Input, FormBtn } from '../../components/FormSignup';
import AUTH from '../../utils/AUTH';
function Login() {

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
        event.preventDefault();
        if (userObject.email && userObject.password) {
            AUTH.signup({
                firstName: userObject.firstName,
                lastName: userObject.lastName,
                email: userObject.email,
                password: userObject.password
            })
                .then(() => setuserObject({
                    redirectTo: "'/"
                }))
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="login">
        <div className="container zindex1">
          <div className="row zindex1">
            <div className="col-md-3 zindex1"></div> 
            <div className="col-md-6 zindex1" >
              <Card className="zindex1" title="Welcome to mycookbook">
                <form className="zindex1" style={{marginTop: 10}}>
                  <h1>Login to mycookbook!</h1>
                  
                  <label htmlFor="username">Username: </label>
                  <Input
                    type="text"
                    name="username"
                    value={userObject.username}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={userObject.password}
                    onChange={handleChange}
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