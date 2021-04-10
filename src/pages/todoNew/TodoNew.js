import React, { useState } from 'react';
import { Fragment } from 'react';
import { FormControl, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import todosTypes from '../../store/reducers/todos/actionTypes';


function TodoNew(props) {
    // const { todos } = props;
    const [todoTitle, setTodoTitle] = useState('');

    const [todoDescription, setTodoDescription] = useState('');

    function addItem(event) {
        if (event) event.preventDefault();
        if (todoTitle === "" || todoTitle.trim().length === 0) return;
        props.dispatch({
            type: todosTypes.ADD_ITEM,
            payload: {
                email: props.auth.email,
                id: Date.now(),
                text: todoTitle.trim(),
                completed: false,
                description: todoDescription.trim(),
                creationDate: new Date().toLocaleDateString()
            }
            // email: props.auth.email,
            // id: Date.now(),
            // text: todoTitle.trim(),
            // completed: false,
            // description: todoDescription.trim(),
            // creationDate: new Date().toLocaleDateString()
        });
        setTodoTitle('');
        setTodoDescription('');
    }

    const keyDownHandler = (event) => {
        if (event.code === "Enter") addItem();
    }

    return (
        <Fragment>
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

            <Button variant="outline-primary" type="submit" onClick={addItem}>Add todo to list</Button>


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

export default connect(mapStateToProps)(TodoNew);