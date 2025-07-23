import React from 'react';
import './MessageDialog.css';

interface MessageDialogProps {
    message: string;
    onClose: () => void;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ message, onClose }) => {
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