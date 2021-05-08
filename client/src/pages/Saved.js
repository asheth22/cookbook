import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from "../components/AppContext"
import API from "../utils/API";
import Results from "../components/Results";


function Saved() {
    const myContext = useContext(AppContext);
    const [savedRecipes, setsavedRecipes] = useState({
        _id: "",
        title: "",
        image: "",
        summary:  "",
        sourceURL: "",
        email: ""
      })
 
 
    useEffect(() => {
        API.savedRecipes(myContext.user.email)
            .then(Recipes => setsavedRecipes(Recipes))          
        }, []); 

   
        return (
            <div className="container">
                <h2>Saved Recipes</h2>
                <Results recipes={savedRecipes} />
            </div>
        )
    
}

export default Saved;