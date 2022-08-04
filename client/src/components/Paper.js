import React from 'react';
const Paper = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.volume && <h4>Volume: {props.volume}</h4>}
            {props.doi && <h4> DOI : {props.doi}</h4>}
            {props.date_of_publication && <h4>Date: {props.date_of_publication}</h4>}
            {props.citations && <h4>Citations: {props.citations}</h4>}
        </div>

    );
  }
  // title,citations,first_name,last_name
  export default Paper;