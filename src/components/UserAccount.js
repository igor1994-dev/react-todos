import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../App.css';

function UserAccount(props) {

    function logout(event) {
        event.preventDefault();
        props.dispatch({
            type: 'LOGOUT'
        })
    }

    return (
        <>
            <div className="col-6 user-email">
                {props.auth.email}
            </div>
            <div className="col-2 logout">
                <Button variant="dark" onClick={logout}>Logout</Button>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(UserAccount);