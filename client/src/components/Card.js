import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({title,authors,doi}) => {
  let navigate = useNavigate();
  return (
<div className='card text-white bg-info mb-3 struct' style={{maxWidth: '18rem',minHeight:'13rem'}} onClick = {() => {
      navigate(`/papers/${doi}`);
  }}>
  <div className='card-header'></div>
  <div className='card-body'>
    <h5 className='card-title'>{title}</h5>
    <p className='card-text'>
      <div>{authors.map((name,i) => 
          <li key = {i}>{name}</li>)}
      </div>
    </p>
  </div>
</div>





  );
}
export default Card;
