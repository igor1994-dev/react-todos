import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';


function TodoList(props) {
  const { todos } = props;   // const todos = props.todos;
  const [todoTitle, setTodoTitle] = useState('');

  const keyDownHandler = (event) => {
    if (event.code === "Enter") addItem();
  }

  function deleteItem(id) {
    props.dispatch({
      type: 'DELETE_ITEM', id: id
    })
  }

  function addItem() {
    if (todoTitle === "" || todoTitle.trim().length === 0) return;

    props.dispatch({
      type: 'ADD_ITEM',
      id: Date.now(), text: todoTitle.trim(), completed: false
    });
    setTodoTitle('');
  }

  function changeCompleted(id, completed) {
    props.dispatch({
      type: 'CHANGE_COMPLETED', id: id, completed: completed
    })
  }

  function changeText(id, text) {
    props.dispatch({
      type: 'CHANGE_TEXT', id: id, text: text
    })
  }

  function saveList() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function clearList() {
    localStorage.clear();
  }

  return (
    <div className="container">
      <h1 className="text-center">Todos</h1>

      <div>
        <InputGroup className="mb-3">
          <FormControl
            type="text"
            placeholder="write your todo"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            autoFocus="autofocus"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onKeyDown={keyDownHandler}
          />
          <InputGroup.Append className="w-30">
            <Button variant="outline-secondary" onClick={addItem}>Add todo</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>

      <ul className="pl-0">
        {todos.map(item => <TodoItem
          key={item.id}
          {...item}
          onDeleteItem={deleteItem}
          onStatusChange={changeText}
          onChangeCompleted={changeCompleted}
        />)}
      </ul>
      <div>
        <Button variant="outline-success" onClick={saveList}>Save changes to localstorage</Button>{' '}
        <Button variant="outline-danger" onClick={clearList}>Clear localstorage</Button>{' '}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList);