import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { FormControl, Form, Button } from 'react-bootstrap';
import todosTypes from '../../redux/todos/actionTypes';

import * as todosActions from '../../redux/todos/actions';

import api from '../../services/api';


function TodoEdit(props) {

    const { userEmail, todos, changeTodo, is_done } = props;
    const todoId = props.match.params.id;

    const [responseData, setReaponseData] = useState({})
    const [todoTitleChanged, setTodoTitleChanged] = useState(``);
    const [todoDescriptionChanged, setTodoDescriptionChanged] = useState('');

    function loadTodoById(id) {
        api.get(`/tasks/${id}`)
            .then(response => {
                setReaponseData(response.data);
                setTodoTitleChanged(response.data.name);
                setTodoDescriptionChanged(response.data.description)
            })
    }

    useEffect(() => loadTodoById(todoId), []);

    // const currentDescription = useSelector(state => state.todos.list).find(item => item.id === parseInt(todoId)).description;
    // const currentTitle = useSelector(state => state.todos.list).find(item => item.id === parseInt(todoId)).name;

    const currentDescription = responseData.description;
    const currentTitle = responseData.name;

    function changeTodoHandler(event) {
        event.preventDefault();
        changeTodo(
            todoId,
            todoTitleChanged.trim(),
            is_done,
            todoDescriptionChanged.trim()
        )
        props.history.push('/todos');
    }

    return (
        <>
            <h1 className='text-center'>Todo id: {props.match.params.id}</h1>

            <FormControl
                type="text"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                autoFocus="autofocus"
                defaultValue={currentTitle}
                onChange={event => setTodoTitleChanged(event.target.value)}
            />

            <Form.Control
                as="textarea"
                rows={6}
                defaultValue={currentDescription}
                onChange={event => setTodoDescriptionChanged(event.target.value)}
            />

            <Button
                variant="outline-success"
                type="submit"
                onClick={changeTodoHandler}
            >Save changes</Button>
        </>
    )
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        userEmail: state.auth.email
    }
}

const mapDispatchToProps = {
    changeTodo: todosActions.changeTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoEdit);