import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios'
import Paper from "../components/Paper";
import Journal from "../components/Journal";
import Conference from "../components/Conference";
// import Authors from "../components/Authors";
import ErrorPage from "./ErrorPage";
// import { useNavigate } from 'react-router-dom';

const PaperDetails = () => {
    let  { doi } = useParams();
    // let navigate = useNavigate();

    const [details,setDetails] = useState({});
    useEffect(() => {
        Axios.post('http://localhost:3001/getPaperDetails',{
        doi : doi
        })
        .then((response) => {
            setDetails(response.data)
        })
      },[doi]);

    // useEffect(() => {
    //     navigate("/ErrorPage")
    // },[!Object.keys(details).length]);

    
    return (
        <div>
        <Paper {...details}/>
        <Conference {...details}/>
        <Journal {...details}/>
        {/* <Authors {...details}/> */}
        {!Object.keys(details).length && <ErrorPage />}
        </div>
    )
    
}

export default PaperDetails;