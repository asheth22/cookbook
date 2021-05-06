import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../components/AppContext';
import Card from "../../components/Card";
// import Input from "../../Input";
import { Input, FormBtn } from '../../components/FormSignup';
import AUTH from '../../utils/AUTH';
function Signup() {

  const myContext = useContext(AppContext);

    const [userObject, setuserObject] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",        
      })
    const [redirect, setredirect] = useState("")  
    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setuserObject({
            ...userObject,
            [name]: value
        })
    };

    const handleFormSubmit = event => {
        console.log("Inside signup form submit ", userObject)
        event.preventDefault();
        if (userObject.email && userObject.password) {
            AUTH.signup({
                firstName: userObject.firstName,
                lastName: userObject.firstName,
                email: userObject.email,
                password: userObject.password
            })
             .then(res => {
               console.log(res);
               myContext.setuserObject(userObject);
               console.log("userobject", userObject)
              // myContext.user.firstName = userObject.firstName,
              // myContext.user.lastName = userObject.firstName,
              // myContext.user.email = userObject.firstName,
              //  myContext.user.password = userObject.firstName,
               myContext.setuserObject(userObject);
              console.log("mycontext user after signup: ", myContext.user)
              setredirect("/search")
            })     
        }
    };
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />
  }
  else {
    return (
      <div className="login">
        <div className="container zindex1">
          <div className="row zindex1">
            <div className="col-md-3 zindex1"></div>
            <div className="col-md-6 zindex1" >
              <Card className="zindex1" title="Welcome to mycookbook">
                <form className="zindex1" style={{ marginTop: 10 }}>
                  <h1>Register for mycookbook!</h1>
                  <label htmlFor="username">First name: </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={userObject.firstName}
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Last name: </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={userObject.lastName}
                    onChange={handleChange}
                  />
                  <label htmlFor="email">email: </label>
                  <Input
                    type="text"
                    name="email"
                    value={userObject.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={userObject.password}
                    onChange={handleChange}
                  />
                  
                  <Link to="/login">Login Here</Link>
                  <FormBtn onClick={handleFormSubmit}>Register</FormBtn>
                </form>
              </Card>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}
export default Signup