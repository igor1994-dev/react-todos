import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import usersTypes from '../../redux/users/actionTypes';
import * as authActions from '../../redux/auth/actions';

import '../../App.css';

import Preloader from '../../components/Preloader';

function SignUp(props) {
    const { isLoading, signup } = props;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    // const users = useSelector(state => state.users);
    // const dispatch = useDispatch();

    // function addUser(event) {
    //     event.preventDefault();
    //     props.dispatch({
    //         type: usersTypes.ADD_USER,
    //         payload: {
    //             login: userEmail,
    //             password: userPassword
    //         }
    //         // login: userEmail,
    //         // password: userPassword
    //     })
    //     setUserEmail('');
    //     setUserPassword('');
    //     let toSigninPage = window.confirm('your account had been created. Please log in to continue');
    //     setIsRedirect(toSigninPage)
    // }

    function handleSubmit(event) {
        event.preventDefault();
        // dispatch(authActions.signup(userEmail, userPassword));
        signup(userEmail, userPassword);
    }

    if (isRedirect) return <Redirect to="/" />

    return (
        <div className="container">
            <h1 className="text-center">Sign up</h1>

            <Preloader isLoading={isLoading} />

            <Form onSubmit={handleSubmit}>
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.users,
        isLoading: state.auth.isLoading,
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         signup: (email, password) => dispatch(authActions.signup(email, password))
//     }
// }

const mapDispatchToProps = {
    signup: authActions.signup
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);