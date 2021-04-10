import React from 'react';
import TodoItem from '../../components/TodoItem';
import Header from '../../components/Header';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import todosTypes from '../../store/reducers/todos/actionTypes';

function Todos(props) {
    const { userEmail, todos } = props;

    function changeCompleted(id, completed) {
        props.dispatch({
            type: todosTypes.CHANGE_COMPLETED,
            payload: {
                id: id,
                completed: completed,
                email: userEmail
            }
            // id: id,
            // completed: completed,
            // email: userEmail
        })
    }

    function deleteItem(id) {
        props.dispatch({
            type: todosTypes.DELETE_ITEM,
            payload: {
                id: id,
                email: userEmail
            }

        })
    }

    return (
        <div className="container">
            <Header />
            <h1 className="text-center">Todos</h1>

            {todos[props.userEmail] !== undefined &&
                <ul className="pl-0">
                    {todos[props.userEmail].map(item => <TodoItem
                        key={item.id}
                        {...item}
                        onDeleteItem={deleteItem}
                        onChangeCompleted={changeCompleted}
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
        userEmail: state.auth.email
    }
}

export default connect(mapStateToProps)(Todos);