import React from 'react';
import { InputGroup, Button } from 'react-bootstrap'
import '../App.css';
import TaskInsert from './TaskInsert';


export default function TodoItem({ title, id, completed, onDeleteItem, onChangeCompleted, onStatusChange }) {
  function handleDeleteBtn() {
    onDeleteItem(id);
  }

  return (
    <li className="todo">
      <div className="container mb-1 px-0 item-wrap">

        <InputGroup.Checkbox
          aria-label="Checkbox for following text input"
          checked={completed}
          onChange={() => onChangeCompleted(id, !completed)} />

        <TaskInsert
          text={title}
          id={id}
          completed={completed}
          onStatusChange={onStatusChange} />

        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={handleDeleteBtn}><span>Delete</span>
          </Button>
        </InputGroup.Append>

      </div>
    </li>
  )
}
