import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActions from '../../redux/auth/actions';
import '../../App.css';
import Preloader from '../../components/Preloader';
import { compose } from 'redux';
import { withModal } from '../../HOC/withModal';
import Modal from '../../components/modal/Modal';

function SignUp(props) {
    const { isLoading, signup, modal, setModal, onCloseModal } = props;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        signup(userEmail, userPassword, setModal);
    }

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


    if (isRedirect) return <Redirect to="/" />

    return (
        <div className="container">

            {modal.isOpen && <Modal text={modal.text} onClose={onCloseModal} />}

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

const mapDispatchToProps = {
    signup: authActions.signup
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withModal)(SignUp);

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);