import React, {Component} from 'react';
import Message from './Message';

export default class MessageBoard extends Component {
    constructor(props) {
        super(props);
        this._createMessages = this._createMessages.bind(this);
    }
    _createMessages(messages) {
        let me = this.props.me;
        return messages.map((message, index) => {
            return <Message key={index} me={me} user={message.user} text={message.text} />
        });
    }
    render() {
        const messages = this._createMessages(
            this.props.messages
        );
        return (
            <div className="message-board">
                {messages}
            </div>
        )
    }
}

