import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormControl, Form, Button } from 'react-bootstrap';
import * as todosActions from '../../redux/todos/actions';
import api from '../../services/api';
import FileUpload from '../../components/FileUpload';
import FileItem from '../../components/FileItem';
import Modal from '../../components/modal/Modal';
import { Link } from 'react-router-dom';

import Comment from '../../components/Comment';
import Paginator from '../../components/Paginator';

function TodoEdit(props) {
    const { changeTodo, is_done } = props;
    const todoId = props.match.params.id;

    const [responseData, setReaponseData] = useState({})
    const [todoTitleChanged, setTodoTitleChanged] = useState(``);
    const [todoDescriptionChanged, setTodoDescriptionChanged] = useState('');

    const [files, setFiles] = useState([]);

    const [filesPage, setFilesPage] = useState({
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
    });

    const [modal, setModal] = useState({
        isOpen: false,
        text: ''
    });
    function closeModal() {
        setModal({
            isOpen: false,
            text: ''
        });
    }

    function filesUpload(formData, id) {
        api.post(`/files/upload/tasks/${id}`, formData)
            .then(response => {
                setModal({ isOpen: true, text: 'File has been successfully uploaded' });

                setFiles([...files, {
                    id: Date.now(),
                    created_at: new Date().toLocaleString(),
                    name: response.data
                }]);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({ isOpen: true, text: validationError.message });
                    })
                }
                if (error.response.status === 413) setModal({ isOpen: true, text: error.response.statusText });

            })
    }

    function loadTodoById(id) {
        api.get(`/tasks/${id}`)
            .then(response => {
                setReaponseData(response.data);
                setTodoTitleChanged(response.data.name);
                setTodoDescriptionChanged(response.data.description)
            })
    }

    // function loadTodoFiles(id) {
    //     api.get(`/tasks/${id}/files`)
    //         .then(response => {
    //             setFiles([...response.data.data])
    //             console.log('response', response)

    //         })
    // }


    function loadTodoFiles(id, currentPage = 1) {
        const offset = currentPage === 1 ? 0 : currentPage * filesPage.pageSize - filesPage.pageSize;

        api.get(`/tasks/${id}/files`, {
            params: {
                limit: filesPage.pageSize,
                offset,
            }
        })
            .then(response => {
                setFiles([...response.data.data])
                // console.log('response', response)
                setFilesPage({ ...filesPage, totalCount: response.data.total, currentPage: currentPage })
            })
    }

    function onFilesPageChange(page) {
        loadTodoFiles(todoId, page);
        // console.log('sssasa', filesPage)
    }

    useEffect(() => {
        loadTodoById(todoId);
        loadTodoFiles(todoId);
    }, []);

    const currentDescription = responseData.description;
    const currentTitle = responseData.name;

    function changeTodoHandler(event) {
        event.preventDefault();
        changeTodo(todoId,
            todoTitleChanged.trim(),
            is_done,
            todoDescriptionChanged.trim(),
            setModal
        )
        // props.history.push('/todos');
    }

    return (
        <>
            {modal.isOpen && <Modal text={modal.text} onClose={closeModal} />}

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

            <FileUpload filesUpload={filesUpload} id={todoId} />

            <ul className="pl-1">
                {
                    files.map(item => <FileItem
                        key={item.id}
                        created_at={item.created_at}
                        name={item.name}
                    />)
                }
            </ul>

            <Paginator
                pageSize={filesPage.pageSize}
                totalCount={filesPage.totalCount}
                currentPage={filesPage.currentPage}
                setCurrentPage={onFilesPageChange}
            />

            <Comment id={todoId} />



            <Button className="mr-1"
                variant="outline-success"
                type="submit"
                onClick={changeTodoHandler}
            >Save changes</Button>

            <Link to='/todos'>
                <Button variant="outline-success">Go back to Todos</Button>{' '}
            </Link>
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