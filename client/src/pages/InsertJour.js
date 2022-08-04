import React, { useState } from 'react';
import Axios from 'axios'
import SearchBox from '../components/SearchBox';
import './InsertJour.css';
const InsertJour = () => {
    const [doi, setDoi] = useState('')
    const [name, setName] = useState('')
    const [issue, setIsuue] = useState('')
    const [journalType, setJournalType] = useState('')
    const[show,setShow] = useState(false);

    const onClickDoi = (event) => {
        setDoi(event.target.value)
    }
    
    const onClickName = (event) => {
        setName(event.target.value)
    }

    const onClickIssue = (event) => {
        setIsuue(event.target.value)
    }

    const onClickJournalType = (event) => {
        setJournalType(event.target.value)
    }

    

    const onClickOfDone = () => {
        if(doi.length && name.length && issue.length && journalType.length){
            Axios.post('http://localhost:3001/insertJournal',{
            doi : doi,
            name : name,
            issue : issue,
            journalType : journalType
          })
          .then((response) => {setShow(response.data)})
        }
    };
 
    return (
        <div>
          <h3>Journal</h3>
          <div className='inJ'>
          <SearchBox searchChange = {onClickDoi} searchfield = 'DOI'/>
          </div>
          <div className='inJ'>
          <SearchBox searchChange = {onClickName} searchfield =  'Name'/>
          </div>
          <div className='inJ'>
          <SearchBox searchChange = {onClickIssue} searchfield = 'Issue' />      
          </div>
          <div className='inJ'>
          <SearchBox searchChange = {onClickJournalType} searchfield = 'Journal type' />
          </div>
          <button className = 'inJ btn btn-primary sub' onClick = {onClickOfDone}> Submit </button>
          <div className='errMsg'>
            {
                show?<h5>Invalid Entries</h5>:null
            }
          </div>
        </div>
    )
}

export default InsertJour;