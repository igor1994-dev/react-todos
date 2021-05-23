import React from 'react';
import './index.css';

function Modal(props) {
    const { text, onClose } = props;

    return (
        <div className="modal-wrap" onClick={onClose}>

            <div className="content" onClick={e => e.stopPropagation()}>

                <div className="modal-text">{text}</div>

                <div className="modal-close">
                    <button className="modal-btn" onClick={onClose}>
                        <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 496.096 496.096" width="16" height="16" >
                            <g>
                                <path d="M259.41,247.998L493.754,13.654c3.123-3.124,3.123-8.188,0-11.312c-3.124-3.123-8.188-3.123-11.312,0L248.098,236.686
			                    L13.754,2.342C10.576-0.727,5.512-0.639,2.442,2.539c-2.994,3.1-2.994,8.015,0,11.115l234.344,234.344L2.442,482.342
		                        c-3.178,3.07-3.266,8.134-0.196,11.312s8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248.098,259.31
	                            l234.344,234.344c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.41,247.998z" />
                            </g>
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Modal;