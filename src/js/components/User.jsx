import React from 'react';

export default function User(props) {
    return (
        <div className="user-status">
            <div className="circle"></div>
            {props.name}
            {props.isTyping ? <div className="loader"></div> : null}
        </div>
    );
}