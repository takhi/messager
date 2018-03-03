import React from 'react';

export default function ErrorPopup(props) {
    if (props.show) return (
        <div className="container">
            <div className="error-arrow"></div>
            <div className="error">{props.message}</div>
        </div>
    );
    return null;
}