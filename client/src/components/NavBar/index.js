import React, { cloneElement } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import AppContext from '../AppContext';
import "./style.css";
import image from "./logo.png";

function Navbar() {
    
    const myContext = useContext(AppContext);
    console.log("mycontext inside Navbar: ", myContext.user)
    console.log("mycontect logged: ", myContext.logged)

    if (!myContext.user.email) {
    return (
      
        <nav className="navbar navbar-expand-lg text-light">
            <div className="container">
            <a className="navbar-brand" href="/"> <img src={image}  height="50px" width="100px"  alt=""/></a>
                {/* <Link className="navbar-brand" to="/"> </Link> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link
                            to="/search"
                            className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
                        > Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/saved"
                            className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                        >mycookbook</Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/login"
                            className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
                        >Login</Link>
                    </li>
                    
                </ul>
            </div>
        </nav>

        );
    }
    else {
        return (
      
            <nav className="navbar navbar-expand-lg text-light">
                <div className="container">
                <a className="navbar-brand" href="/"> <img src={image}  height="50px" width="100px"  alt=""/></a>
                    {/* <Link className="navbar-brand" to="/"> </Link> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link
                                to="/search"
                                className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
                            > Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/saved"
                                className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
                            >mycookbook</Link>
                        </li>
                      
                        <li className="nav-item">
                            <Link
                                to="/logout"
                                className={window.location.pathname === "/logout" ? "nav-link active" : "nav-link"}
                            >Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    
            );
    }
}

export default Navbar;