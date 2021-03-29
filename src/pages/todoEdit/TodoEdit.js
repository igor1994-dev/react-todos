import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControl, Form, Button } from 'react-bootstrap';

function TodoEdit(props) {
    const { userEmail, todos } = props;

    const todoId = props.match.params.id;

    const editableTodo = todos[userEmail].find(item => item.id === parseInt(todoId));

    const [todoTitleChanged, setTodoTitleChanged] = useState(editableTodo.text);

    const [todoDescriptionChanged, setTodoDescriptionChanged] = useState(editableTodo.description);

    function changeText(event) {
        event.preventDefault();
        props.dispatch({
            type: 'CHANGE_TEXT',
            id: editableTodo.id,
            text: todoTitleChanged.trim(),
            description: todoDescriptionChanged.trim(),
            email: userEmail
        })
        props.history.push('/todos')
    }

    return (
        <>
            <h1 className='text-center'>Todo id: {props.match.params.id}</h1>

            <FormControl
                type="text"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                autoFocus="autofocus"
                defaultValue={editableTodo.text}
                onChange={event => setTodoTitleChanged(event.target.value)}
            />

            <Form.Control
                as="textarea"
                rows={6}
                defaultValue={editableTodo.description}
                onChange={event => setTodoDescriptionChanged(event.target.value)}
            />

            <Button variant="outline-success" type="submit" onClick={changeText}>Save changes</Button>
        </>
    )
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        userEmail: state.auth.email
    }
}

export default connect(mapStateToProps)(TodoEdit);