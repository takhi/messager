import React, {Component} from 'react';
import Message from './Message';
import ReactDOM from 'react-dom';

export default class MessageBoard extends Component {
    constructor(props) {
        super(props);
        this._createMessages = this._createMessages.bind(this);
    }
    componentDidUpdate() {
        if (this._latestMessage) ReactDOM.findDOMNode(this._latestMessage).scrollIntoView();
    }
    _createMessages(messages) {
        let me = this.props.me;
        return messages.map((message) => {
            return <Message key={message.key} me={me} user={message.user} text={message.text} ref={component => this._latestMessage = component} />
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

