import React from "react";

const Card = (props) => (
  <div className="card">
    <div className="card-header bg-info" style={{color: '#fff'}}>
      <h5>{props.title}</h5>
    </div>
    <div className="card-body">
      {props.children}
    </div>
  </div>
);

export default Card; 
