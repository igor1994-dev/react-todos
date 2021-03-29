import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function NotAuthRoute(props) {
    const { isAuth } = props

    if (isAuth) return <Redirect to="/todos"/>

    return <Route {...props} />
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(NotAuthRoute);