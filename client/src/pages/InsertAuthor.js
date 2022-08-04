import React, { useState } from 'react';
import Axios from 'axios'
import SearchBox from '../components/SearchBox';
import './InsertAuthor.css'
const InsertAuthor = () => {
    const [authorId, setAuthorId] = useState('')
    const [suffix, setSuffix] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [hIndex, setHIndex] = useState('')
    const [rAffiliation, setRAffiliation] = useState('')
    const[show,setShow] = useState(false);

    const onClickAuthorId = (event) => {
        setAuthorId(event.target.value)
    }
    
    const onClickSuffix = (event) => {
        setSuffix(event.target.value)
    }

    const onClickFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const onClickMiddleName = (event) => {
        setMiddleName(event.target.value)
    }

    const onClickLastName = (event) => {
        setLastName(event.target.value)
    }

    const onClickHIndex = (event) => {
        setHIndex(event.target.value)
    }

    const onClickRAffiliation = (event) => {
        setRAffiliation(event.target.value)
    }

    const onClickOfDone = () => {
        if(authorId.length && suffix.length && firstName.length && middleName.length && lastName.length && hIndex.length && rAffiliation.length){
            Axios.post('http://localhost:3001/insertAuthor',{
            authorId : authorId,
            suffix : suffix,
            firstName : firstName,
            middleName : middleName,
            lastName : lastName,
            hIndex : hIndex ,
            rAffiliation : rAffiliation
          })
          .then((response) => {setShow(response.data)})
        }
    };
 
    return (
        <div>
          <h3>Author</h3>
          <div className='inA'>
          <SearchBox searchChange = {onClickAuthorId} searchfield = 'AuthorId'/>
          </div>
          <div className='inA'>
          <SearchBox searchChange = {onClickSuffix} searchfield =  'Suffix'/>  
          </div>
          <div className='inA'>
          <SearchBox searchChange = {onClickFirstName} searchfield = 'FirstName' />     
          </div>
          <div className='inA'>
          <SearchBox searchChange = {onClickMiddleName} searchfield = 'MiddleName' />           
          </div>
          <div className='inA'>
          <SearchBox searchChange = {onClickLastName} searchfield = 'LastName' />            
          </div>
          <div className='inA'>
          <SearchBox searchChange = {onClickHIndex} searchfield = 'HIndex' />           
          </div>
          <div className='inA'>
          <SearchBox searchChange = {onClickRAffiliation} searchfield = 'RAffiliation' />           
          </div>
          <button className = 'inA btn btn-primary sub' onClick = {onClickOfDone}> Submit </button>
          <div className='errMsg'>
            {
                show?<h5>Invalid Entries</h5>:null
            }
          </div>
        </div>
    )
}

export default InsertAuthor;