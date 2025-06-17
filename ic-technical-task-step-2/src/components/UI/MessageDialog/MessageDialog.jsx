import React from 'react';
import './MessageDialog.css';

const MessageDialog = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p className="dialog-message">{message}</p>
                <button onClick={onClose} className="dialog-button">
                    Close
                </button>
            </div>
        </div>
    );
};

export default MessageDialog;