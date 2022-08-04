import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div >
      <input
        style={{backgroundColor : '#ffffff'}}
        type='search'
        placeholder= {searchfield}
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;