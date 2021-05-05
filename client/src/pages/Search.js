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
        console.log("Inside useEffect on search.js", myContext.user)
        API.savedRecipes()
            .then(savedRecipes => setrecipes(savedRecipes))          
        }, []); 

    const makeRecipes = RecipeData => {
        console.log("Recipedata: ", RecipeData)
        
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
        console.log("Inside search recipe: ", query)
        console.log("mycontect inside search recipe: ", myContext.user)
        API.getRecipe(query)
            .then(res => {
                console.log(res.data.results);
                console.log("before setrecipes", recipes)
                const newRecipes = res.data.results.map(RecipeData => makeRecipes(RecipeData))
                // setrecipes({ recipes: res.data.results.map(RecipeData => makeRecipes(RecipeData)) })
                console.log("after makerecipes", newRecipes)
                setrecipes(newRecipes)
                console.log("recipes set:", recipes)
            })
            
    };

    const handleInputChange = event => {
        const name = event.target.name;
        const inputValue = event.target.value;
        setvalue(inputValue)
        console.log("searcing for: ", inputValue);
    };

    const handleFormSubmit = event => {
        console.log("inside form submit");
        event.preventDefault();
        searchRecipe(value);
        console.log("Done with recipe search", recipes)
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
