import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function AuthRoute(props) {
    const { issAuth } = props

    if (issAuth) return <Redirect to='/todos' />

    return <Route {...props} />
}

function mapStateToProps(state) {
    return {
        issAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(AuthRoute);