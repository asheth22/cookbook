import React from "react";
import Form from "../components/Form";
import Results from "../components/Results";
import API from "../utils/API";

class Search extends React.Component {
    state = {
        value: "",
        recipes: []
    };
    
    componentDidMount() {
        console.log("Inside componenetmount on search.js")
        API.savedRecipes()
            .then(savedRecipes => this.setState({ recipes: savedRecipes }))
            .catch(err => console.error(err));
    }

    makeRecipe = RecipeData => {
        console.log("Recipedata: ", RecipeData)  
        return {
                      
                _id: RecipeData.id,
                title: RecipeData.title,
                image: RecipeData.image,
                summary:  RecipeData.summary, 
                sourceURL: RecipeData.spoonacularSourceUrl    
            
        }
    }

    searchRecipe = query => {
        console.log("Inside search recipe: ", query)
        API.getRecipe(query)
            .then(res => {
                console.log(res.data);                
                this.setState({ recipes: res.data.results.map(RecipeData => this.makeRecipe(RecipeData)) })
            })
            .catch(err => console.error(err));
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log("searcing for: ", value);
    };

    handleFormSubmit = event => {
        console.log("inside form submit");
        event.preventDefault();
        this.searchRecipe(this.state.search);
    };

    render() {
        return (
            <div>
                <Form
                    search={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                <div className="container">
                    <h2></h2>
                
                    <Results recipes={this.state.recipes} />
                </div>
            </div>
        )
    }
}

export default Search;
