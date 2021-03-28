import React, { useState } from 'react';
import { Fragment } from 'react';
import { FormControl, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


function TodoNew(props) {
    const { todos } = props;
    const [todoTitle, setTodoTitle] = useState('');

    const [todoDescription, setTodoDescription] = useState('');

    function addItem(event) {
        if (todoTitle === "" || todoTitle.trim().length === 0) return;
        event.preventDefault();
        props.dispatch({
            type: 'ADD_ITEM',
            email: props.auth.email,
            id: Date.now(),
            text: todoTitle.trim(),
            completed: false,
            description: todoDescription.trim(),
            creationDate: new Date().toLocaleDateString()
        });
        setTodoTitle('');
        setTodoDescription('');
    }

    const keyDownHandler = (event) => {
        if (event.code === "Enter") addItem();
    }

    function saveList() {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    function clearList() {
        localStorage.clear();
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

            <Button variant="outline-secondary" type="submit" onClick={addItem}>Add todo to list</Button>


            <Link to='/todos'>
                <Button variant="outline-primary">Go back to Todos</Button>{' '}
            </Link>

            <div>
                <Button variant="outline-success" onClick={saveList}>Save changes to localstorage</Button>{' '}
                <Button variant="outline-danger" onClick={clearList}>Clear localstorage</Button>{' '}
            </div>

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