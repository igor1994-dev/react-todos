import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import '../App.css';

function Preloader(props) {
    const { isLoading } = props;

    if (!isLoading) return null;

    return (
        <div className="preloader-container">
            <Spinner animation="grow" className="preloader" />
        </div>
    )
}

export default Preloader;
