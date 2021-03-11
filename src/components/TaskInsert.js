import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';

function TaskInsert(props) {
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const classNames = ['title', 'container', 'px-0'];
    if (props.completed) {
        classNames.push('done')
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const keyDownHandler = (key) => {
        if (key.code === "Enter") setEditMode(false);
    }

    return (
        <div className={classNames.join(' ')}>

            {!editMode &&
                <span className="text" onDoubleClick={activateEditMode}>{props.text}</span>
            }

            {editMode &&
                <FormControl
                    placeholder=""
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    autoFocus="autofocus"
                    value={props.text}
                    onChange={(event) => props.onStatusChange(props.id, event.target.value)}
                    onBlur={deactivateEditMode}
                    onKeyDown={keyDownHandler}
                />

            }

        </div>
    )

}

export default TaskInsert;