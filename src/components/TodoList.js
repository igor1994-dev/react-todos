import React, { useState } from 'react';
import TodoItem from './TodoItem';


export default function TodoList(props) {
  const [todos, setTodos] = useState([]);

  const [todoTitle, setTodoTitle] = useState('');

  const keyDownHandler = (event) => {
    if (todoTitle === "" || todoTitle.trim().length === 0) {
      return
    } else {
      if (event.code === "Enter") {
        setTodos([...todos, { id: Date.now(), title: todoTitle.trim(), completed: false }]);
        setTodoTitle('');
      }
    }
  }

  function deleteItem(id) {
    setTodos(todos.filter(todos => todos.id !== id))
  }

  function addItem() {
    if (todoTitle === "" || todoTitle.trim().length === 0) {
      return
    } else {
      setTodos([...todos, { id: Date.now(), title: todoTitle.trim(), completed: false }]);
      setTodoTitle('');
    }
  }

  function changeCompeted(id, completed) {
    setTodos(todos.map((todo) => {
      if (id === todo.id) {
        todo.completed = completed;
      }
      return todo
    }))
  }

  function changeTitle(id, text) {
    setTodos(todos.map((todo) => {
      if (id === todo.id) {
        todo.title = text;
      }
      return todo
    }))
  }

  return (
    <>
      <h1>Todos</h1>

      <div>
        <input
          placeholder="Write your task"
          autoFocus="autofocus"
          type="text"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          onKeyDown={keyDownHandler}
        />
        <button type="button" onClick={addItem}>add todo</button>
      </div>

      <ul>
        {todos.map(item => <TodoItem
          key={item.id}
          {...item}
          onDeleteItem={deleteItem}
          onStatusChange={changeTitle}
          onChangeCompleted={changeCompeted}
        />)}
      </ul>
    </>
  )
}