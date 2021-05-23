import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../App.css';
// import authTypes from '../redux/auth/actionTypes';

import * as authActions from '../redux/auth/actions';


function UserAccount(props) {
    return (
        <>
            <div className="col-6 user-email-wrap">
                {props.auth.email}
            </div>
            <div className="col-2 logout">
                <Button variant="dark" onClick={props.logout}>Logout</Button>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    logout: authActions.logout
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);