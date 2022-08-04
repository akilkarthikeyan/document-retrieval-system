import './MainPage.css';
import Axios from 'axios'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

const MainPage = () => {
  let navigate = useNavigate();

  const [papers, setPapers] = useState([])
  const [searchfieldTitle, setSearchfieldTitle] = useState('')
  const [searchfieldAuthor, setSearchfieldAuthor] = useState('')
  const [searchfieldFromDate, setSearchfieldFromDate] = useState('')
  const [searchfieldToDate, setSearchfieldToDate] = useState('')

  const onClickOfDone = () => {
    if(searchfieldTitle.length || searchfieldAuthor.length || searchfieldFromDate.length || searchfieldToDate.length){
      Axios.post('http://localhost:3001/getPapers',{
      Title : searchfieldTitle,
      Author : searchfieldAuthor,
      FromDate : searchfieldFromDate,
      ToDate : searchfieldToDate
      })
      .then((response) => {setPapers(response.data)})
    }
  };

  const onClickOfInsert = () => {
    navigate("/papers/insert/")
  }

  const onSearchChangeTitle = (event) => {
    setSearchfieldTitle(event.target.value)
  }
  const onSearchChangeAuthor = (event) => {
    setSearchfieldAuthor(event.target.value)
  }

  const onSearchChangeFromDate = (event) => {
    setSearchfieldFromDate(event.target.value)
  }

  const onSearchChangeToDate = (event) => {
    setSearchfieldToDate(event.target.value)
  }

  return (
      <div>
        <button type="button" className = 'insertButton btn btn-info'onClick = {onClickOfInsert}> Insert </button>
        <div className='heading'>
          <h1 className='f1'>Research Papers</h1>
          <h3> Filters </h3>
        
          <div className='fil'>
            <div className='inM'>
            <SearchBox searchChange={onSearchChangeTitle} searchfield = 'Search by Title'/>
            </div>
            <div className='inM'>
            <SearchBox searchChange={onSearchChangeAuthor} searchfield = 'Search by Authors' />
            </div>
            <div className='inM'>
            <SearchBox searchChange={onSearchChangeFromDate} searchfield = ' from' />             
            </div>
            <div className='inM'>
            <SearchBox searchChange={onSearchChangeToDate} searchfield = 'to' />              
            </div>
          </div>
          <button type = "button"  className = 'btn btn-primary' onClick={onClickOfDone}>Search</button>
        </div>
        <div className='scroll'>
        <Scroll>
          <CardList papers={papers}/>
        </Scroll>
        </div>
      </div>
    );
}
export default MainPage;
