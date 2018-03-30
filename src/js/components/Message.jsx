import React, {Component} from 'react';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.atMe = new RegExp(`@${props.me}`);
    }
    render() {
        let messageStyle = 'message';
        if (this.props.me !== this.props.user) {
            messageStyle += ' friend';
            if (this.props.text.search(this.atMe) >= 0) messageStyle += ' atMe';
        }
        return (
            <div className="message-container">
                <div className={messageStyle}>
                    <div className="user">{this.props.user}</div>
                    <div className="text">{this.props.text}</div>
                </div>
            </div>
        )
    }
};