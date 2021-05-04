import React from 'react';
import '../App.css';

function FileItem(props) {
    const { created_at, name } = props;

    let isImg;

    if (name.includes(".png") || name.includes(".jpg") || name.includes(".jpeg")) isImg = true;

    return (
        <li className="file-list">
            <div className="row">
                <div className="col">
                    <div>File name: {name}</div>
                    <div>Creation date: {created_at}</div>

                    {isImg &&
                        <img className="download-img" alt='' src={`http://demoapi.rexsoftproduction.com/api/files/show/${name}`} />
                    }
                    {!isImg &&
                        <div className="hidden-preview">The file preview can not be shown</div>
                    }
                </div>

                <div className="col-2 download-btn-wrap">
                    <a className="download-btn" href={`http://demoapi.rexsoftproduction.com/api/files/download/${name}`} download>
                        Download
                    </a>
                </div>
            </div>
        </li>
    )
}

export default FileItem;