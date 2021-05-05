import React, { useEffect, useState } from 'react';
import TodoItem from '../../components/TodoItem';
import Header from '../../components/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as todosActions from '../../redux/todos/actions';
import Preloader from '../../components/Preloader';
import Paginator from '../../components/Paginator';
import Modal from '../../components/modal/Modal';


function Todos(props) {
    const { todos, loadTodos, deleteTodo, pageSize, todosTotalCount, currentPage, changeTodo } = props;

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

    useEffect(() => { 
        loadTodos() 
    }, [])

    function onPaginationChange(page) {
        loadTodos(page);
    }

    function deleteItem(id) {
        deleteTodo(id, setModal)
    }

    return (
        <div className="container">

            {modal.isOpen && <Modal text={modal.text} onClose={closeModal} />}

            <Preloader isLoading={props.todos.isLoading} />

            <Header />

            <h1 className="text-center">Todos</h1>

            <Paginator pageSize={pageSize}
                totalCount={todosTotalCount}
                currentPage={currentPage}
                setCurrentPage={onPaginationChange}
            />

            {
                <ul className="pl-0">
                    {todos.list.map(item => <TodoItem
                        {...item}
                        key={item.id}
                        creationDate={item.created_at}
                        text={item.name}
                        onDeleteItem={deleteItem}
                        changeTodo={changeTodo}
                        setModal={setModal}
                    />)}
                </ul>
            }

            <div className="add-todo-btn">
                <Link to='/todos/new'>
                    <Button variant="outline-primary">Add Todo</Button>{' '}
                </Link>
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        userEmail: state.auth.email,
        pageSize: state.todos.pageSize,
        todosTotalCount: state.todos.todosTotalCount,
        currentPage: state.todos.currentPage
    }
}

const mapDispatchToProps = {
    loadTodos: todosActions.loadTodos,
    deleteTodo: todosActions.deleteTodo,
    changeTodo: todosActions.changeTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);