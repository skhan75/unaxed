import React from 'react';
import { Close } from '@styled-icons/evil';
import './modal.css';

const Modal = ({ isOpen, onRequestClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onRequestClose}>
                    <Close size={24}/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;