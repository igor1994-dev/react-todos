import React from 'react';
import { Fragment } from 'react';
import Header from '../../components/Header';

function Main() {
    return (
        <Fragment>
            <Header />

            <h1 className="text-center">Welcome to TodoWorld</h1>
            
            <h4 className="text-center">Sign in to start</h4>
        </Fragment>
    )
}

export default Main;