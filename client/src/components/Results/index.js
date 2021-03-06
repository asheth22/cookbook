import React, { useEffect, useState } from "react";
import { Redirect, Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../AppContext';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import API from "../../utils/API";

function Results({ recipes }) {
    const [savedrecipes, setsavedrecipes] = useState([]);
    const myContext = useContext(AppContext);

    useEffect(() => {
        API.savedRecipes(myContext.user.email)
            .then(savedRecipes => setsavedrecipes(savedRecipes))
            .catch(err => console.error(err));
    }, []);

    const handleSave = recipe => {
        if (savedrecipes.map(recipe => recipe._id).includes(recipe._id)) {
            console.log("inside delete recipes: ", recipe._id)
            API.deleteRecipe(recipe._id)
                .then(deletedrecipe => setsavedrecipes(savedrecipes.filter(recipe => recipe._id !== deletedrecipe._id)))
                .catch(err => console.error(err));
        } else {
            API.saveRecipe(recipe)
                .then(savedrecipe => {
                    setsavedrecipes(savedrecipes.concat(savedrecipe));
                })
                .catch(err => console.error(err));
        }
    }


    return (
        <div>
            {!recipes.length ? (
                <h1 className="text-center">No Results to Display</h1>
            ) : (
                    <div>
                        {recipes.map(result => (
                            <div className="card mb-3" key={result._id}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <img alt={result.title} className="img-fluid" src={result.image} />
                                    </div>
                                    <div className="col-md-10">
                                        <div className="card-body">
                                            <h5 className="card-title">{result.title} </h5>
                                            <p className="card-text">{ReactHtmlParser(result.summary)}</p>
                                            <div>
                                                <a href={result.sourceURL} className="btn badge-pill btn-outline-dark mt-3" target="_blank" >View</a>
                                                <button onClick={() => handleSave(result)} className="btn badge-pill btn-outline-success mt-3 ml-3" >
                                                    {savedrecipes.map(recipe => recipe._id).includes(result._id) ? "Unsave" : "Save"}
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

export default Results;