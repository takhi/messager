import React, {Component} from 'react';

const PLACEHOLDER = 'enter message';
const TYPING_WAIT = 3000;
let timeOutID;

export default class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {inputText: ''};
        this._handleChange = this._handleChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._checkIsTyping = this._checkIsTyping.bind(this);
    }
    _checkIsTyping() {
        timeOutID ? clearTimeout(timeOutID) : this.props.onTyping();
        timeOutID = setTimeout(() => {
            timeOutID = undefined;
            this.props.onNotTyping();
        }, TYPING_WAIT);
    }
    _handleKeyPress(e) {
        this._checkIsTyping();
        if (e.key === 'Enter') this._handleClick();
    }
    _handleChange(e) {
        this.setState({inputText: e.target.value});
    }
    _handleClick() {
        if (this.state.inputText.trim() === '') return;
        let message = {user: this.props.user, text: this.state.inputText};
        this.setState({inputText: ''});
        this.props.onSend(message);
    }
    render() {
        if (this.props.enabled) return (
            <div>
                <div>
                    <input type="text" value={this.state.inputText} onChange={this._handleChange} onKeyPress={this._handleKeyPress} placeholder={PLACEHOLDER}/>
                    <button onClick={this._handleClick}>Send</button>
                </div>
            </div>
        );
        return null;
    }
}