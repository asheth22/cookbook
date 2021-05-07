import React, { Component } from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import API from "../../utils/API";
import { useContext } from 'react';
import AppContext from '../AppContext';

class Results extends Component {
    
    state = {
        savedrecipes: [],
    }

    componentDidMount() {
        console.log("inside results componenet mount")
        API.savedRecipes()
            .then(savedRecipess => this.setState({ savedRecipess: savedRecipess }))
            .catch(err => console.error(err));
    }

    handleSave = recipe => {
        console.log("input properties: ", this.props.recipes[0].email)
        console.log("Inside handle save with input: ", recipe)
        console.log("saving recipe_id ", recipe._id)
        if (this.state.savedrecipes.map(recipe => recipe._id).includes(recipe._id)) {
            console.log("deleting existing recipeId", recipe._id)
            API.deleterecipe(recipe._id)
                .then(deletedrecipe => this.setState({ savedrecipes: this.state.savedrecipes.filter(recipe => recipe._id !== deletedrecipe._id) }))
                .catch(err => console.error(err));
        }
            
            console.log("Noew saving recipe", recipe)
            API.saveRecipe(recipe)
                .then(savedrecipe => {
                    console.log("after API ", recipe);
                    this.setState({ savedrecipes: this.state.savedrecipes.concat([savedrecipe]) });
                   
                })
                .catch(err => console.error(err));
        
    }
       
    render() {
        return (
            <div>
                {!this.props.recipes.length ? (
                    <h1 className="text-center">No Results to Display</h1>
                ) : (
                        <div>
                            {this.props.recipes.map(result => (
                                <div className="card mb-3" key={result._id}>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img alt={result.title} className="img-fluid" src={result.image} />
                                        </div>
                                        <div className="col-md-10">
                                            <div className="card-body">
                                                <h5 className="card-title">{result.title} </h5>
                                                <p className="card-text">{ ReactHtmlParser(result.summary)}</p>
                                                <div>
                                                    <a href={result.sourceURL} className="btn badge-pill btn-outline-dark mt-3" target="_blank" >View</a>
                                                    <button onClick={() => this.handleSave(result)} className="btn badge-pill btn-outline-success mt-3 ml-3" >
                                                        {this.state.savedrecipes.map(recipe => recipe._id).includes(result._id) ? "Unsave" : "Save"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        )
    }
}

export default Results;