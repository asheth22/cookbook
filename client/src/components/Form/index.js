import React from "react";


function Form(props){
return (
  <div className="container">
  <form>
    <div className="form-group">
        {/* <label htmlFor="search"><h2>Search for Books of Interest and Save </h2></label> */}
        <h1 style={{ fontSize: "1.5em", color: "MediumSeaGreen" }}>
               <strong >Search </strong>  and  <strong> Save Recipes</strong>  
            </h1><br></br>
      <input
        onChange={props.handleInputChange}
        value={props.search}
        name="search"
        type="text"
        className="form-control"
        placeholder="recipe"
        id="search"
      />
      <button onClick={props.handleFormSubmit} className="btn btn-dark mt-3 mb-5">
        Search
        </button>
    </div>
  </form>
  </div>
);
}

export default Form;
