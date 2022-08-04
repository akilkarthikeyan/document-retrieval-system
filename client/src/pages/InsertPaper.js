import React, { useState } from 'react';
import Axios from 'axios'
import SearchBox from '../components/SearchBox';
import './InsertPaper.css'
const InsertPaper = () => {
    const [doi, setDoi] = useState('')
    const [volume, setVolume] = useState('')
    const [title, setTitle] = useState('')
    const [dateOfPublication, setDateOfPublication] = useState('')
    const [citations, setCitations] = useState('')
    const [paperType, setPaperType] = useState('')
    const [authors, setAuthors] = useState([])
    const[show, setShow] = useState(false);


    const onClickDoi = (event) => {
        setDoi(event.target.value)
    }
    
    const onClickVolume = (event) => {
        setVolume(event.target.value)
    }

    const onClickTitle = (event) => {
        setTitle(event.target.value)
    }

    const onClickDateOfPublication = (event) => {
        setDateOfPublication(event.target.value)
    }

    const onClickCitations = (event) => {
        setCitations(event.target.value)
    }

    const onClickPaperType = (event) => {
        setPaperType(event.target.value)
    }

    const onClickAuthor1 = (event) => {
        let authorsTemp = [...authors]
        authorsTemp[0] = event.target.value;
        setAuthors(authorsTemp);
    }

    const onClickAuthor2 = (event) => {
        let authorsTemp = [...authors]
        authorsTemp[1] = event.target.value;
        setAuthors(authorsTemp);
    }

    const onClickAuthor3 = (event) => {
        let authorsTemp = [...authors]
        authorsTemp[2] = event.target.value;
        setAuthors(authorsTemp);
    }

    const onClickAuthor4 = (event) => {
        let authorsTemp = [...authors]
        authorsTemp[3] = event.target.value;
        setAuthors(authorsTemp);
    }

    const onClickAuthor5 = (event) => {
        let authorsTemp = [...authors]
        authorsTemp[4] = event.target.value;
        setAuthors(authorsTemp);
    }

    const onClickOfDone = () => {

        if(doi.length && volume.length && title.length && dateOfPublication.length && citations.length && paperType.length && authors.length){
            Axios.post('http://localhost:3001/insertPaper',{
            doi : doi,
            volume : volume,
            title : title,
            dateOfPublication : dateOfPublication,
            citations : citations,
            paperType : paperType,
            authors: authors
          })
          .then((response) => {setShow(response.data)})
        }
    };
 
    return (
        <div>
          <h3>Paper</h3>
          <div className='inP'>
          <SearchBox searchChange = {onClickDoi} searchfield = 'Doi'/>
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickVolume} searchfield =  'Volume'/>
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickTitle} searchfield = 'Title' />        
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickDateOfPublication} searchfield = 'Date of publication' />          
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickCitations} searchfield = 'Citations' />           
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickPaperType} searchfield = 'Paper type' />           
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickAuthor1} searchfield = 'Author 1' />           
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickAuthor2} searchfield = 'Author 2' />           
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickAuthor3} searchfield = 'Author 3' />           
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickAuthor4} searchfield = 'Author 4' />            
          </div>
          <div className='inP'>
          <SearchBox searchChange = {onClickAuthor5} searchfield = 'Author 5' />           
          </div>
          <button className = 'inP btn btn-primary sub' onClick = {onClickOfDone}> Submit </button>
          <div className='errMsg'>
            {
                show?<h5>Invalid Entries</h5>:null
            }
          </div>
        </div>
    )
}

export default InsertPaper;