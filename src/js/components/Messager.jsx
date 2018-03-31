import React, {Component} from 'react';
import Message from './Message';
import HUD from './HUD';
import MessageBoard from './MessageBoard';
import ErrorPopup from './ErrorPopup';
import JoinInput from './JoinInput';
import MessageInput from './MessageInput';

import MessageServer from '../classes/MessageServer';

import {updateUsers, updateUserTypyingStatus, loadBoard, addMessage} from '../actions/messagerActions'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        users: state.users,
        messages: state.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserTypyingStatus: (status) => dispatch(updateUserTypyingStatus(status)),
        updateUsers: (users) => dispatch(updateUsers(users)),
        loadBoard: (board) => dispatch(loadBoard(board)),
        addMessage: (message) => dispatch(addMessage(message))
    }
}

const newMessageDingURL = 'ding.ogg';
const leaveJoinChimeURL = 'chime.ogg';
let newMessageDing = new Audio(newMessageDingURL);
let leaveJoinChime = new Audio(leaveJoinChimeURL);

class Messager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinedIn: false,
            isError: false,
            isLoading: false
        };
        this._joinServer = this._joinServer.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
        this._handleJoin = this._handleJoin.bind(this);
        this._handleJoined = this._handleJoined.bind(this);
        this._handleJoinFail = this._handleJoinFail.bind(this);
        this._handleLeave = this._handleLeave.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleMessages = this._handleMessages.bind(this);
        this._handleNewMessage = this._handleNewMessage.bind(this);
        this._typing = this._typing.bind(this);
        this._handleTyping = this._handleTyping.bind(this);
    }
    _handleJoin() {
        this.setState({joinedIn: true, isError: false});
        this._server.getMessages();
    }
    _handleJoinFail(error) {
        this.setState({isError: true, errorMessage: error.message});
    }
    _handleJoined(users) {
        this.props.updateUsers(users);
        leaveJoinChime.play();
    }
    _handleLeave(users) {
        this.props.updateUsers(users);
        leaveJoinChime.play();
    }
    _handleError(error) {
        this.setState({isError: true, errorMessage: error.message});
    }
    _handleMessages(board) {
        this.props.loadBoard(board);
    }
    _handleNewMessage(message) {
        if (message.user !== this._user) newMessageDing.play();
        this.props.addMessage(message);
    }
    _joinServer(user) {
        this._user = user;
        this._server.join(user);
    }
    _sendMessage(message) {
        this._server.sendMessage(message);
    }
    _handlePong() {
        console.log('ponged');
    }
    _handleTyping(isTyping, user) {
        
        this.props.updateUserTypyingStatus({isTyping: isTyping, user: user});
    }
    _typing(isTyping) {
        this._server.typing(isTyping);
    }
    componentWillMount() {
        let server = this._server = new MessageServer(this.props.url);
        server.onOpen = () => {
            server.ping();
            server.onPong = this._handlePong;
            server.onJoin = this._handleJoin;
            server.onJoined = this._handleJoined;
            server.onJoinFail = this._handleJoinFail;
            server.onLeave = this._handleLeave;
            server.onMessages = this._handleMessages;
            server.onNewMessage = this._handleNewMessage;
            server.onTyping = this._handleTyping;
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <MessageBoard me={this._user} messages={this.props.messages} />
                    <HUD users={this.props.users} />
                </div>
                <ErrorPopup show={this.state.isError} message={this.state.errorMessage} />
                <MessageInput enabled={this.state.joinedIn} user={this._user} onTyping={this._typing} onSend={this._sendMessage} />
                <JoinInput enabled={!this.state.joinedIn} onJoin={this._joinServer} onError={this._handleError} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messager);