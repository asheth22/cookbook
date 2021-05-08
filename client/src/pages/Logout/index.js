
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
  
  
    useEffect(() => {           
      AUTH.logout().then(response => {
        myContext.user.firstName = "";
              myContext.user.lastName = "";
              myContext.user.email = "";
              myContext.user.password = "";
              myContext.setuserObject({});
        setredirect("/") 
      });
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
              <Card className="zindex1" title="Login or Signupk">
                
              </Card>            
              </div>
          </div>
        </div>
        
        </div>
     )}
}
export default Login