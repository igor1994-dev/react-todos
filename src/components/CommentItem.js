import React, { useState } from 'react';
import '../App.css';


function CommentItem(props) {
    const { content, created_at, commentId, deleteComment, todoId, editComment } = props;

    const [isEdit, setIsEdit] = useState(false);
    const [newComment, setNewComment] = useState('');

    function editButtonHandler() {
        setIsEdit(!isEdit);
    }

    function editCommentHandler() {
        editComment(todoId, commentId, newComment);
        setNewComment('');
        setIsEdit(!isEdit);
    }

    return (
        <li className="comment">

            <div className="p-2 comment-item">
                <div className="row">
                    <div className="col pr-0">
                        <div>Created at: {created_at}</div>

                        {!isEdit && <div className="font-italic">{content}</div>}

                        {isEdit &&
                            <div className="edit-comment-wrap">
                                <input
                                    type="text"
                                    className="change-comment"
                                    autoFocus="autofocus"
                                    defaultValue={content}
                                    onChange={event => setNewComment(event.target.value)}
                                />
                                <button className="edit-comment-save" onClick={editCommentHandler}>save</button>
                            </div>
                        }

                    </div>

                    <div className="col-2">
                        <button className="comment-btn" onClick={editButtonHandler}>Edit</button>
                        <button className="comment-btn" onClick={() => deleteComment(todoId, commentId)}>Delete</button>
                    </div>
                </div>
            </div>

        </li>
    )
}

export default CommentItem;