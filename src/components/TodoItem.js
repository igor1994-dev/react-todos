import React from 'react';
import { InputGroup, Button } from 'react-bootstrap'
import '../App.css';
import Description from './Description';
import { withRouter } from 'react-router';



function TodoItem({ description, creationDate, text, id, completed, onDeleteItem, onChangeCompleted, onStatusChange, history, match }) {
  function handleDelete() {
    onDeleteItem(id);
  }

  const classNames = ["text"];
  if (completed) {
    classNames.push('done')
  }

  return (
    <li className="todo">
      <div className="container px-0 mb-3 item-wrap">

        <div className="row">
          <div className="col-1 pr-0">
            <InputGroup.Checkbox
              aria-label="Checkbox for following text input"
              checked={completed}
              onChange={() => onChangeCompleted(id, !completed)}
            />
          </div>

          <div className="col-8 px-0">
            <div className={classNames.join(" ")}>{text}</div>
          </div>

          <div className="col-3 pl-0">
            <div className="creation-date">Creation date: {creationDate}</div>
          </div>
        </div>

        <Description description={description} />



        <InputGroup.Append>
          <Button
            className="mr-2"
            variant="outline-secondary"
            onClick={handleDelete}><span>Delete</span>
          </Button>

          <Button
            variant="outline-secondary"
            onClick={() => history.push('/todos/edit/' + id)}>
            <span>Edit</span>
          </Button>
        </InputGroup.Append>

      </div>
    </li>
  )
}

export default withRouter(TodoItem);