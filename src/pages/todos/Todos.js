import React from 'react';
import TodoItem from '../../components/TodoItem';
import Header from '../../components/Header';
import { Button } from 'react-bootstrap';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

function Todos(props) {

    const { userEmail, todos, isAuth } = props;   // const todos = props.todos;

    function changeCompleted(id, completed) {
        props.dispatch({
            type: 'CHANGE_COMPLETED',
            id: id,
            completed: completed,
            email: userEmail
        })
    }

    function deleteItem(id) {
        props.dispatch({
            type: 'DELETE_ITEM',
            id: id,
            email: userEmail
        })
    }

    if (!isAuth) return <Redirect to="/" />


    return (
        <div className="container">
            <Header />
            <h1 className="text-center">Todos</h1>

            <ul className="pl-0">
                {todos[props.userEmail].map(item => <TodoItem
                    key={item.id}
                    {...item}
                    onDeleteItem={deleteItem}
                    onChangeCompleted={changeCompleted}
                />)}
            </ul>

            <Link to='/todos/new'>
                <Button variant="outline-primary">Add Todo</Button>{' '}
            </Link>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        userEmail: state.auth.email,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps)(Todos);