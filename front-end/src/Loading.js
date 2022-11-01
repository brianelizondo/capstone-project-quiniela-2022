import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.css';

function Loading(){
    return (
        <div className="Loading">
            <Spinner animation="border" role="status"></Spinner>
        </div>
    );
}

export default Loading;