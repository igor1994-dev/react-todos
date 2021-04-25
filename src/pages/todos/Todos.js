import React, { useEffect } from 'react';
import TodoItem from '../../components/TodoItem';
import Header from '../../components/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import todosTypes from '../../redux/todos/actionTypes';
import * as todosActions from '../../redux/todos/actions';
import Preloader from '../../components/Preloader';

import Paginator from '../../components/Paginator';


function Todos(props) {
    const { userEmail, todos, loadTodos, deleteTodo, pageSize, todosTotalCount, currentPage, changeTodo } = props;

    useEffect(() => { loadTodos() }, [])

    function onPaginationChange(page) {
        loadTodos(page);
    }

    // console.log('Todos props', todos)

    // function changeCompleted(id, completed) {
    //     props.dispatch({
    //         type: todosTypes.CHANGE_COMPLETED,
    //         payload: {
    //             id: id,
    //             completed: completed,
    //             email: userEmail
    //         }
    //     })
    // }

    // function deleteItem(id) {
    //     props.dispatch({
    //         type: todosTypes.DELETE_ITEM,
    //         payload: {
    //             id: id,
    //             email: userEmail
    //         }
    //     })
    // }



    function deleteItem(id) {
        deleteTodo(id)
    }

    return (
        <div className="container">

            <Preloader isLoading={props.todos.isLoading} />

            <Header />
            <h1 className="text-center">Todos</h1>

            <Paginator pageSize={pageSize} todosTotalCount={todosTotalCount} currentPage={currentPage} setCurrentPage={onPaginationChange}/>

            {/* {todos[props.userEmail] !== undefined &&
                <ul className="pl-0">
                    {todos[props.userEmail].map(item => <TodoItem
                        key={item.id}
                        {...item}
                        onDeleteItem={deleteItem}
                        onChangeCompleted={changeCompleted}
                    />)}
                </ul>
            } */}

            {
                <ul className="pl-0">
                    {todos.list.map(item => <TodoItem
                        key={item.id}
                        creationDate={item.created_at}
                        description={item.description}
                        text={item.name}
                        {...item}
                        onDeleteItem={deleteItem}

                        changeTodo={changeTodo}
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
    // setCurrentPage: todosActions.setCurrentPage
    // changeTodoStatus: todosActions.changeTodoStatus,
    changeTodo: todosActions.changeTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);