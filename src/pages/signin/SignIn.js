import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as authActions from '../../redux/auth/actions';
import Preloader from '../../components/Preloader';
import Modal from '../../components/modal/Modal';
import { compose } from 'redux';
import { withModal } from '../../HOC/withModal';


function SignIn(props) {

    const { signin, isAuth, isLoading, modal, setModal, onCloseModal } = props;
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    // const [modal, setModal] = useState({
    //     isOpen: false,
    //     text: ''
    // });
    // function closeModal() {
    //     setModal({
    //         isOpen: false,
    //         text: ''
    //     });
    // }


    function handleLogin(event) {
        event.preventDefault();
        signin(authEmail, authPassword, setModal);
    }

    if (isAuth) return <Redirect to="/todos" />

    return (
        <div className="container">

            {modal.isOpen && <Modal text={modal.text} onClose={onCloseModal} />}


            <Preloader isLoading={isLoading} />

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

                <Button variant="primary" type="submit">Log In</Button>

                <Link to='/signup'>
                    <Button variant="primary" type="submit" className="ml-2">Sign Up</Button>
                </Link>
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
        isLoading: state.auth.isLoading,
        users: state.users
    }
}

const mapDispatchToProps = {
    signin: authActions.signin
}


export default compose(connect(mapStateToProps, mapDispatchToProps), withModal)(SignIn);

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);