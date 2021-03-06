import React, { useState } from 'react';
import '../App.css';
import TaskInsert from './TaskInsert';

export default function TodoItem({ title, id, completed, onDeleteItem, onChangeCompleted }) {
  // const [checked, setChecked] = useState(completed);

  const classNames = ['todo'];
  if (completed) {
    classNames.push('done')
  }

  function handleDeleteBtn() {
    onDeleteItem(id);
  }

  return (
    <li className={classNames.join(' ')}>

      <input type="checkbox" checked={completed} onChange={() => onChangeCompleted(id, !completed)} />

      <TaskInsert text={title} />

      <button type="button" onClick={handleDeleteBtn}>delete</button>

    </li>
  )
}