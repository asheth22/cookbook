
import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../components/AppContext';
import Card from "../../components/Card";
import { Input, FormBtn } from '../../components/FormSignup';
import AUTH from '../../utils/AUTH';

function Login() {

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
        event.preventDefault();
        if (userObject.email && userObject.password) {
          AUTH.login({
            email: userObject.email,
            password: userObject.password
          })
            .then(res => {
              myContext.setuserObject(res.user);
              myContext.user.firstName = res.user.firstName;
              myContext.user.lastName = res.user.lastName;
              myContext.user.email = res.user.email;
              myContext.user.password = res.user.password;
              myContext.setuserObject(res.user);
              setredirect("/search")
            })               
        }
  };
  
    useEffect(() => {   
      
      }, []);
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
                  
                  <Link to="/Signup">Signup</Link>
                  <FormBtn onClick={handleFormSubmit}>login</FormBtn>
                  <Redirect to = "/"></Redirect>
                  
                </form>
              </Card>            
              </div>
          </div>
        </div>
        
        </div>
     )}
}
export default Login