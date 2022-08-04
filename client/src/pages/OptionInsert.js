import React from "react";
import { useNavigate } from 'react-router-dom';
import './OptionInsert.css'

const OptionInsert = () => {
    let navigate = useNavigate();

    const onClickOfAuthor = () => {
        navigate("/papers/insert/author");
    }

    const onClickOfPaper = () => {
        navigate("/papers/insert/paper");
    }

    const onClickOfJour = () => {
        navigate("/papers/insert/jour");
    }

    const onClickOfConf = () => {
        navigate("/papers/insert/conf");
    }

    return (
        <div className="btn-group-vertical">
            <h1>Add to </h1>
            <button type="button" className="btn btn-outline-success struct3"  onClick = {onClickOfAuthor}> Author </button>
            <button type="button" className="btn btn-outline-success struct3"  onClick = {onClickOfPaper}> Paper </button>
            <button type="button" className="btn btn-outline-success struct3"  onClick = {onClickOfJour}> Journal </button>
            <button type="button" className="btn btn-outline-success struct3"  onClick = {onClickOfConf}> Conference </button>
        </div>
    )
}

export default OptionInsert;