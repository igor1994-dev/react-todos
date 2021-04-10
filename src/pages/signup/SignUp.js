import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import usersTypes from '../../store/reducers/users/actionTypes';

function SignUp(props) {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    function addUser(event) {
        event.preventDefault();
        props.dispatch({
            type: usersTypes.ADD_USER,
            payload: {
                login: userEmail,
                password: userPassword
            }
            // login: userEmail,
            // password: userPassword
        })
        setUserEmail('');
        setUserPassword('');
        let toSigninPage = window.confirm('your account had been created. Please log in to continue');
        setIsRedirect(toSigninPage)
    }

    if (isRedirect) return <Redirect to="/" />

    return (
        <div className="container">
            <h1 className="text-center">Sign up</h1>

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={userEmail}
                        onChange={event => setUserEmail(event.target.value)}
                    />

                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={event => setUserPassword(event.target.value)}
                    />

                </Form.Group>

                <Button variant="primary" type="submit" onClick={addUser}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(SignUp);