import React, { useState } from 'react';

function TaskInsert(props) {

    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(props.text);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }

    const keyDownHandler = (key) => {
        if (key.code === "Enter") setEditMode(false);
    }

    const onStatusChange = (event) => setText(event.currentTarget.value);


    return (
        <div>

            {!editMode &&
                <span onDoubleClick={activateEditMode}>{text}</span>
            }

            {editMode &&
                <input
                    type="text"
                    value={text}
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    onKeyDown={keyDownHandler}
                    autoFocus="autofocus"
                />
            }

        </div>
    )

}

export default TaskInsert;









/////////////

// import React, { useState } from 'react';

// function TaskInsert(props) {

//     let [editMode, setEditMode] = useState(true);
//     let [status, setStatus] = useState(props.status);

//     const activateEditMode = () => {
//         setEditMode(true);
//     }

//     const deactivateEditMode = () => {
//         setEditMode(false);
//     }

//     const keyDownHandler = (key) => {
//         if (key.code === "Enter") setEditMode(false);
//     }

//     const onStatusChange = (event) => setStatus(event.currentTarget.value);


//     return (
//         <div>

//             {!editMode &&
//                 <div>
//                     <span onDoubleClick={activateEditMode}>{status}</span>
//                 </div>
//             }

//             {editMode &&
//                 <div>
//                     <input type="text" onChange={onStatusChange}
//                         onBlur={deactivateEditMode}
//                         onKeyDown={keyDownHandler}
//                         value={status} />
//                 </div>
//             }

//         </div>
//     )

// }

// export default TaskInsert;