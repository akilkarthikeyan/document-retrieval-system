import React from 'react';
const Conference = (props) => {
    return (
        <div>
            {props.conference_name && <h4>Conference: {props.conference_name}</h4>}
            {props.conference_type && <h4>Conference Type: {props.conference_type}</h4>}
            {props.venue && <h4>Venue : {props.venue}</h4>}
        </div>

    );
  }

  export default Conference;