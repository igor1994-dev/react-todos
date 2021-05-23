import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import '../App.css';
import CommentItem from './CommentItem';
import api from '../services/api';
import Modal from './modal/Modal';
import logger from '../services/logger';
import Paginator from './Paginator';
import { withModal } from '../HOC/withModal';


function Comment(props) {
    const { id, modal, setModal, onCloseModal } = props; //todo id
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);

    const [comentsPage, setComentsPage] = useState({
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
    });

    useEffect(() => {
        loadComments(id);
    }, []);

    function deleteComment(todoId, commentId) {
        api.delete(`/tasks/${todoId}/comments/${commentId}`)
            .then(response => {
                if (response.status === 200) setModal({ isOpen: true, text: response.data.notification })
                const currentComments = comments.filter(i => i.id !== commentId);
                setComments(currentComments);
            })
            .catch((error) => {
                logger(error);
                if (error.response.status === 404) {
                    setModal({ isOpen: true, text: error.response.data.notification });
                }
            })
    }

    function addComment() {
        api.post(`/tasks/${id}/comments`, {
            content
        })
            .then(response => {
                if (response.status === 201) {
                    setModal({ isOpen: true, text: response.data.notification });
                    setComentsPage({
                        ...comentsPage, totalCount: comentsPage.totalCount + 1
                    });
                }
            })
            .then(() => loadComments(id))
            .catch(error => {
                logger(error);
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({ isOpen: true, text: validationError.message })
                    })
                }
            })
        setContent('mmm');
    }

    function loadComments(id, currentPage = 1) {
        const offset = currentPage === 1 ? 0 : currentPage * comentsPage.pageSize - comentsPage.pageSize;

        api.get(`/tasks/${id}/comments`, {
            params: {
                limit: comentsPage.pageSize,
                offset,
            }
        })
            .then(response => {
                setComments([...response.data.data]);
                setComentsPage({ pageSize: 10, totalCount: parseInt(response.data.total), currentPage: currentPage })
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
                logger(error);
                if (error.response && error.response.status === 422) {
                    error.response.data.forEach(validationError => {
                        setModal({ isOpen: true, text: validationError.message })
                    })
                }
                if (error.response.status === 404) setModal({ isOpen: true, text: error.response.data.notification })
                if (error.response.status === 400) setModal({ isOpen: true, text: error.response.data.notification })
            })
    }

    function onCommentsPageChange(page) {
        loadComments(id, page);
    }

    // const [modal, setModal] = useState({
    //     isOpen: false,
    //     text: ''
    // });
    // function closeModal() {
    //     setModal({
    //         isOpen: false,
    //         text: ''
    //     });
    // }

    return (
        <div className="comments-wrap mb-4">
            <div className="p-4">
                {modal.isOpen && <Modal text={modal.text} onClose={onCloseModal} />}

                <FormControl
                    type="text"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    placeholder="Write your comment"
                    defaultValue={content}
                    onChange={event => setContent(event.target.value)}
                />

                <button className="add-comment-btn mb-4" onClick={() => addComment()}>Add comment</button>

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

                <Paginator
                    pageSize={comentsPage.pageSize}
                    totalCount={comentsPage.totalCount}
                    currentPage={comentsPage.currentPage}
                    setCurrentPage={onCommentsPageChange}
                />

            </div>
        </div>
    )
}

export default withModal(Comment);