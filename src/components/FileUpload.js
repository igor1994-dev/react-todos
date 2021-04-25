import React, { useState } from 'react';
import '../App.css';

function FileUpload(props) {
    const { filesUpload, id } = props;

    const [drag, setDrag] = useState(false);

    function dragStartHandler(event) {
        event.preventDefault();
        setDrag(true);
    }
    function dragLeaveHandler(event) {
        event.preventDefault();
        setDrag(false);
    }

    function onDropHandler(event) {
        event.preventDefault();
        let files = [...event.dataTransfer.files];
        setDrag(false);

        const formData = new FormData();
        formData.append('file', files[0])

        filesUpload(formData, id);
    }

    return (
        <div className="file-upload">
            {drag
                ? <div className="drop-area"
                    onDragStart={event => dragStartHandler(event)}
                    onDragLeave={event => dragLeaveHandler(event)}
                    onDragOver={event => dragStartHandler(event)}
                    onDrop={event => onDropHandler(event)}
                >Drop files to upload</div>
                : <div className="drag-area"
                    onDragStart={event => dragStartHandler(event)}
                    onDragLeave={event => dragLeaveHandler(event)}
                    onDragOver={event => dragStartHandler(event)}
                >Drag files to upload</div>
            }
        </div>
    )
}

export default FileUpload;