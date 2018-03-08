import React, {Component} from 'react';

export default class Message extends Component {
    render() {
        return (
            <div className="message-container">
                <div className={`message${this.props.me === this.props.user ? '' : ' friend'}`}>
                    <div className="user">{this.props.user}</div>
                    <div className="text">{this.props.text}</div>
                </div>
            </div>
        );
    }
};