import React from 'react';
import Card from './Card';
import './CardList.css';
const CardList = ({ papers }) => {
  const paperList = papers.map((paper,i) => {
    return (
      <Card 
        key = {i}
        title = {paper.title}
        authors = {paper.authors}
        doi = {paper.doi}
        />
    );
  });

  return (
    <div>
      <div className='str'>
      {paperList}
      </div>
    </div>
  );
}

export default CardList;