import React from 'react';

export default function Message(props) {
    return (
        <div className="message-container">
            <div className={`message${props.me === props.user ? '' : ' friend'}`}>
                <div className="user">{props.user}</div>
                <div className="text">{props.text}</div>
            </div>
        </div>
    );
};