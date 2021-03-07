import React, { useState } from 'react';

function TaskInsert(props) {

    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const keyDownHandler = (key) => {
        if (key.code === "Enter") setEditMode(false);
    }

    return (
        <div>

            {!editMode &&
                <span onDoubleClick={activateEditMode}>{props.text}</span>
            }

            {editMode &&
                <input
                    type="text"
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