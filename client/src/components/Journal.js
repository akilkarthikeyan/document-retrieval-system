import React from 'react';
const Journal = (props) => {
    return (
        <div>
            {props.journal_name && <h4>Journal: {props.journal_name}</h4>}
            {props.issue && <h4>Issue: {props.issue}</h4>}
            {props.journal_type && <h4>Journal Type: {props.journal_type}</h4>}
        </div>

    );
  }

  export default Journal;