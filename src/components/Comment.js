import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import '../App.css';
import CommentItem from './CommentItem';
import api from '../services/api';
import Modal from './modal/Modal';


function Comment(props) {
    const { id } = props; //todo id
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        loadComments(id);
    }, [])

    function deleteComment(todoId, commentId) {
        api.delete(`/tasks/${todoId}/comments/${commentId}`)
            .then(response => {
                if (response.status === 200) setModal({ isOpen: true, text: response.data.notification })
                const currentComments = comments.filter(i => i.id !== commentId);
                setComments(currentComments)
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setModal({ isOpen: true, text: error.response.data.notification })
                }
            })
    }


    function addComment(id, content) {
        api.post(`/tasks/${id}/comments`, {
            content
        })
            .then(response => {
                if (response.status === 201) setModal({ isOpen: true, text: response.data.notification })
            })
            .then(() => {
                setComments(
                    [...comments, {
                        // id: Date.now(),
                        id: comments[comments.length - 1].id + 1,
                        content: content,
                        created_at: new Date().toLocaleString()
                    }]
                )
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({ isOpen: true, text: validationError.message })
                    })
                }

            })
        // setContent('');
    }

    function loadComments(id) {
        api.get(`/tasks/${id}/comments`)
            .then(response => {
                setComments([...response.data.data])
            })
    }

    function editComment(todoId, commentId, commentContent) {
        api.patch(`/tasks/${todoId}/comments/${commentId}`, {
            content: commentContent
        })
            .then(response => {
                if (response.status === 200) setModal({ isOpen: true, text: response.data.notification })
                loadComments(todoId);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({ isOpen: true, text: validationError.message })
                    })
                }
                if (error.response.status === 404) setModal({ isOpen: true, text: error.response.data.notification })
                if (error.response.status === 400) setModal({ isOpen: true, text: error.response.data.notification })

            })
    }

    const [modal, setModal] = useState({
        isOpen: false,
        text: ''
    });
    function closeModal() {
        setModal({
            isOpen: false,
            text: ''
        });
    }

    return (
        <div className="comments-wrap mb-4">
            <div className="p-4">
                {modal.isOpen && <Modal text={modal.text} onClose={closeModal} />}

                <FormControl
                    type="text"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    placeholder="Write your comment"
                    defaultValue={content}
                    onChange={event => setContent(event.target.value)}
                />

                <button className="add-comment-btn mb-4" onClick={() => addComment(id, content)}>Add comment</button>

                <ul className="pl-0">
                    {comments.map(item => <CommentItem
                        todoId={id}
                        commentId={item.id}
                        key={item.id}
                        content={item.content}
                        created_at={item.created_at}
                        deleteComment={deleteComment}
                        editComment={editComment} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Comment;