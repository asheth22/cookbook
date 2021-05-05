import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Results from "../components/Results";

function Saved() {
    
    const [savedRecipes, setsavedRecipes] = useState({
        titlee: "",
        Image: "",
        summary: "",
        sourceURL: "",
        email: ""        
      })
   
                  
   
        
        useEffect(() => {
            API.savedRecipes()
                .then(savedRecipes => setsavedRecipes(savedRecipes))
           
        })
    
        return (
            <div className="container">
                <h2>Saved Recipes</h2>
                <Results recipes={savedRecipes} />
            </div>
        )    
}

export default Saved;