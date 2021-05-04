import React from 'react';
import '../App.css';

function FileUpload(props) {
    const { filesUpload, id } = props;

    function dragStartHandler(event) {
        event.preventDefault();
        event.stopPropagation()
    }
    function dragLeaveHandler(event) {
        event.preventDefault();
        event.stopPropagation()
    }

    function onDropHandler(event) {
        event.preventDefault();
        event.stopPropagation()
        const loadedFile = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        const formData = new FormData();
        formData.append('file', loadedFile[0])

        filesUpload(formData, id);
    }

    return (
        <>
            <label className="dropzone-wrap" htmlFor="file-input">
                <div className="dropzone" tabIndex="0"
                    onDragStart={event => dragStartHandler(event)}
                    onDragLeave={event => dragLeaveHandler(event)}
                    onDragOver={event => dragStartHandler(event)}
                    onDrop={event => onDropHandler(event)}
                >
                    <p className="dropzone-inscription">Drag 'n' drop some files here, or click to select files</p>
                </div>
            </label>

            <input id="file-input" className="file-upload" type="file" autoComplete="off" tabIndex="-1"
                onChange={onDropHandler} />
        </>
    )
}

export default FileUpload;