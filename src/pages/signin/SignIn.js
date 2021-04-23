import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import authTypes from '../../redux/auth/actionTypes';
import * as authActions from '../../redux/auth/actions';
import Preloader from '../../components/Preloader';


function SignIn(props) {
    const {signin, isAuth, isLoading} = props;
console.log('props signin',isAuth, isLoading)
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();
        signin(authEmail, authPassword);
    }


    // function logIn(event) {
    //     event.preventDefault();
    //     const emailCheck = props.users.list.find(item => item.login === authEmail);
    //     const passwordCheck = props.users.list.find(item => item.password === authPassword);

    //     if ((typeof emailCheck === "undefined") || (typeof passwordCheck === "undefined")) {
    //         alert('The login or password is incorrect')
    //     } else if ((authEmail === emailCheck.login) & (authPassword === passwordCheck.password)) {
    //         props.dispatch({
    //             type: authTypes.AUTH_SUCCESS,
    //             payload: { email: authEmail }
    //             // email: authEmail
    //         })
    //         setAuthEmail('');
    //         setAuthPassword('');
    //     }
    // }

    if (isAuth) return <Redirect to="/todos" />
    // if (props.auth.isAuth) return <Redirect to="/todos" />


    return (
        <div className="container">

            <Preloader isLoading={isLoading}/>

            <h1 className="text-center">Sign in</h1>

            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={authEmail}
                        onChange={event => setAuthEmail(event.target.value)}
                    />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={authPassword}
                        onChange={event => setAuthPassword(event.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit"
                // onClick={logIn}
                >Log In
                </Button>

                <Link to='/signup'>
                    <Button variant="primary" type="submit" className="ml-2">Sign Up</Button>
                </Link>
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        // auth: state.auth,
        isAuth: state.auth.isAuth,
        isLoading: state.auth.isLoading,
        users: state.users
    }
}



const mapDispatchToProps = {
    signin: authActions.signin
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);