import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { InputGroup, Button, FormControl } from 'react-bootstrap'



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
    setTodos(todos.filter(todos => todos.id !== id));
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

  function saveList() {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  function clearList() {
    localStorage.clear();
    setTodos([]);
  }
  useEffect(() => {
    const row = localStorage.getItem('todos') || '[]';
    setTodos(JSON.parse(row));
  }, [])

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
          onStatusChange={changeTitle}
          onChangeCompleted={changeCompeted}
        />)}
      </ul>
      <div>
        <Button variant="outline-success" onClick={saveList}>Save list</Button>{' '}
        <Button variant="outline-danger" onClick={clearList}>Clear list</Button>{' '}
      </div>
    </div>
  )
}