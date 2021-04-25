import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { FormControl, Form, Button } from 'react-bootstrap';
import todosTypes from '../../redux/todos/actionTypes';

import * as todosActions from '../../redux/todos/actions';

import FileUpload from '../../components/FileUpload';


function TodoEdit(props) {
    const { userEmail, todos, changeTodo, filesUpload } = props;
    const todoId = props.match.params.id;
    const currentDescription = useSelector(state => state.todos.list).find(item => item.id === parseInt(todoId)).description;
    const currentTitle = useSelector(state => state.todos.list).find(item => item.id === parseInt(todoId)).name;

    // const editableTodo = todos[userEmail].find(item => item.id === parseInt(todoId));

    // const [todoTitleChanged, setTodoTitleChanged] = useState(editableTodo.text);
    // const [todoDescriptionChanged, setTodoDescriptionChanged] = useState(editableTodo.description);

    const [todoTitleChanged, setTodoTitleChanged] = useState(currentTitle);
    const [todoDescriptionChanged, setTodoDescriptionChanged] = useState(currentDescription);

    // function changeText(event) {
    //     event.preventDefault();
    //     props.dispatch({
    //         type: todosTypes.CHANGE_TEXT,
    //         payload: {
    //             id: editableTodo.id,
    //             text: todoTitleChanged.trim(),
    //             description: todoDescriptionChanged.trim(),
    //             email: userEmail
    //         }
    //     })
    //     props.history.push('/todos')
    // }

    function changeTodoHandler(event) {
        event.preventDefault();
        changeTodo(
            todoId,
            todoTitleChanged.trim(),
            false,
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
                // defaultValue={editableTodo.description}
                defaultValue={currentDescription}
                onChange={event => setTodoDescriptionChanged(event.target.value)}
            />


            <FileUpload filesUpload={filesUpload} id={todoId}/>


            <Button
                variant="outline-success"
                type="submit"
                // onClick={changeText}
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
    filesUpload: todosActions.filesUpload

}

export default connect(mapStateToProps, mapDispatchToProps)(TodoEdit);