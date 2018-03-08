import React, {Component} from 'react';

const PLACEHOLDER = 'enter username';
const ERROR_MESSAGE = {invalid_name: 'Username is invalid'};
const isValidUsername = /^\w+$/;

export default class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {inputText: ''};
        this._handleChange = this._handleChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
    }
    _handleChange(e) {
        this.setState({inputText: e.target.value});
    }
    _handleClick() {
        let user = this.state.inputText;
        if (isValidUsername.test(user)) {
            this.props.onJoin(user);
        } else {
            this.props.onError({message: ERROR_MESSAGE.invalid_name});
        }
        this.setState({inputText: ''});
    }
    render() {
        if (this.props.enabled) return (
            <div>
                <input type="text" value={this.state.inputText} onChange={this._handleChange} placeholder={PLACEHOLDER} />
                <button onClick={this._handleClick}>Join</button>
            </div>
        );
        return null;
    }
}