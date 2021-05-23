import React, { useState } from 'react';
import { Fragment } from 'react';
import { FormControl, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as todosActions from '../../redux/todos/actions';
import { compose } from 'redux';
import { withModal } from '../../HOC/withModal';
import Modal from '../../components/modal/Modal';


function TodoNew(props) {
    const { addTodo, modal, setModal, onCloseModal } = props;

    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');

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

    function handleAddTodo(event) {
        if (event) event.preventDefault();
        if (todoTitle === "" || todoTitle.trim().length === 0 ||
            todoDescription === "" || todoDescription.trim().length === 0) {
            setModal({
                isOpen: true,
                text: 'You can not create empty todo'
            });
            return;
        }

        addTodo(todoTitle.trim(), todoDescription.trim(), null, setModal);
        setTodoTitle('');
        setTodoDescription('');
    }

    const keyDownHandler = (event) => {
        if (event.code === "Enter") handleAddTodo();
    }

    return (
        <Fragment>

            {modal.isOpen && <Modal text={modal.text} onClose={onCloseModal} />}

            <h1 className="text-center">add new todo</h1>

            <FormControl
                type="text"
                placeholder="write your todo title"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                autoFocus="autofocus"
                value={todoTitle}
                onChange={event => setTodoTitle(event.target.value)}
                onKeyDown={keyDownHandler}
            />

            <Form.Control
                as="textarea"
                placeholder="write your todo description"
                rows={3}
                value={todoDescription}
                onChange={event => setTodoDescription(event.target.value)}
                onKeyDown={keyDownHandler}
            />

            <Button
                variant="outline-primary"
                type="submit"
                onClick={handleAddTodo}
            >Add todo to list</Button>

            <Link to='/todos'>
                <Button variant="outline-primary">Go back to Todos</Button>{' '}
            </Link>

        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        auth: state.auth
    }
}

const mapDispatchToProps = {
    addTodo: todosActions.addTodo,
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withModal)(TodoNew);



// export default connect(mapStateToProps, mapDispatchToProps)(TodoNew);