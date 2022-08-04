import React from 'react';

const Scroll = (props) => {
  return (
    <div style={{ padding:'1em',height: '33em',overflow: 'scroll',overflowX: 'hidden'}}>
      {props.children}
    </div>
  );
};

export default Scroll;