import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../components/AppContext';

import Form from "../components/Form";
import Results from "../components/Results";
import API from "../utils/API";

function Search() {

    const myContext = useContext(AppContext);
    const [value, setvalue] = useState("");
    const [recipes, setrecipes] = useState({
        _id: "",
        title: "",
        image: "",
        summary:  "",
        sourceURL: "",
        email: ""
      })
        
    useEffect(() => {
        API.savedRecipes(myContext.user.email)           
          
            .then(savedRecipes => setrecipes(savedRecipes))          
        }, []);       
        
    const makeRecipes = RecipeData => {      
        return {
                      
                _id: RecipeData.id,
                title: RecipeData.title,
                image: RecipeData.image,
                summary:  RecipeData.summary, 
                sourceURL: RecipeData.spoonacularSourceUrl,
                email: myContext.user.email            
        }
    }
    const searchRecipe = query => {
        API.getRecipe(query)
            .then(res => {
                const newRecipes = res.data.results.map(RecipeData => makeRecipes(RecipeData))                
                setrecipes(newRecipes)
            })
            
    };

    const handleInputChange = event => {
        const name = event.target.name;
        const inputValue = event.target.value;
        setvalue(inputValue)
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        searchRecipe(value);
    };

 
        return (
            <div>
               
                <Form
                    search={value}
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}                />
                    
                <div className="container">
                    <h2></h2>                
                    <Results recipes={recipes} />
                </div>
            </div>
        )
    
}

export default Search;
