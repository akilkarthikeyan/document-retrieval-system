import React, { useState } from 'react';
import Axios from 'axios'
import './InsertConf.css'
import SearchBox from '../components/SearchBox';
const InsertConf = () => {
    const [doi, setDoi] = useState('')
    const [confName, setConfName] = useState('')
    const [confType, setConfType] = useState('')
    const [venue, setVenue] = useState('')
    const [show, setShow] = useState(false);

    const onClickDoi = (event) => {
        setDoi(event.target.value)
    }
    
    const onClickConfName = (event) => {
        setConfName(event.target.value)
    }

    const onClickConfType = (event) => {
        setConfType(event.target.value)
    }

    const onClickVenue = (event) => {
        setVenue(event.target.value)
    }


    const onClickOfDone = () => {
        if(doi.length && confName.length && confType.length && venue.length){
            Axios.post('http://localhost:3001/insertConference',{
            doi : doi,
            confName : confName,
            confType : confType,
            venue : venue
          })
          .then((response) => {setShow(response.data)})
        }
    };
 
    return (
        <div>
          <h3>Conference</h3>
          <div className = 'inC'>
          <SearchBox  searchChange = {onClickDoi} searchfield = 'DOI'/>
          </div>
          <div  className = 'inC' >
          <SearchBox searchChange = {onClickConfName} searchfield =  'Conference Name'/>
          </div>
          <div  className = 'inC' >
          <SearchBox searchChange = {onClickConfType} searchfield = 'Conference Type' />
          </div>
          <div  className = 'inC' >
          <SearchBox searchChange = {onClickVenue} searchfield = 'Venue' />
          </div>
          <button className = 'inC btn btn-primary sub' onClick = {onClickOfDone}> Submit </button>
          <div className='errMsg'>
            {
                show?<h5>Invalid Entries</h5>:null
            }
          </div>
        </div>
    )
}

export default InsertConf;