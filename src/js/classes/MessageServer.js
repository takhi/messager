const SERVER = {messages: 'ALL', new_message: 'NEW', success: 'OK', fail: 'FAIL', pong: 'PONG'};
SERVER.USER = {joined: 'JOINED', left: 'LEFT', typing: 'TYPE', not_typing: 'NTYPE'};
const CLIENT = {get_messages: 'GET', add_message: 'POST', join: 'JOIN', ping: 'PING', typing: 'TYPE', not_typing: 'NTYPE'};

const ERROR_MESSAGE = {user_taken: 'Username is taken'};

export default class MessageServer {
    constructor(url) {
        this.connection = new WebSocket(url);
        this.isConnected = false;
        this._setupHandlers(this.connection);
    }
    _setupHandlers(connection) {
        connection.onmessage = (event) => {
            let server = JSON.parse(event.data);
            switch (server.response) {
                case SERVER.messages:
                    this.onMessages(server.board);
                    break;
                case SERVER.new_message:
                    this.onNewMessage(server.message);
                    break;
                case SERVER.success:
                    if (server.request === CLIENT.join) this.onJoin();
                    if (server.pong === SERVER.pong) this.onPong();
                    break;
                case SERVER.fail:
                    if (server.request === CLIENT.join) this.onJoinFail({message: ERROR_MESSAGE.user_taken});
                    break;
                case SERVER.USER.joined:
                    this.onJoined(server.data.users);
                    break;
                case SERVER.USER.left:
                    this.onLeave(server.data.users);
                    break;
                case SERVER.USER.typing:
                    this.onTyping(true, server.data);
                    break;
                case SERVER.USER.not_typing:
                    this.onTyping(false, server.data);
                    break;
            }
        }
        connection.onopen = () => {
            this.isConnected = true;
            this.onOpen();
        };
        connection.onclose = () => {
            this.isConnected = false;
            this.onClose();
        };
    }
    join(user) {
        this.connection.send(JSON.stringify({request: CLIENT.join, user: user}));
    }
    getMessages() {
        this.connection.send(JSON.stringify({request: CLIENT.get_messages}));
    }
    sendMessage(message) {
        this.connection.send(JSON.stringify({request: CLIENT.add_message, message: message}));
    }
    ping() {
        this.connection.send(JSON.stringify({request: CLIENT.ping}));
    }
    typing(isTyping) {
        this.connection.send(JSON.stringify({
            request: isTyping ? CLIENT.typing : CLIENT.not_typing
        }));
    }
    close() {
        this.connection.close();
    }
    onOpen() {}
    onClose() {}
    onMessages(board) {}
    onNewMessage(message) {}
    onJoin() {}
    onJoined(users) {}
    onJoinFail() {}
    onLeave(users) {}
    onPong() {}
    onTyping(isTyping, user) {}
}

MessageServer.SERVER = SERVER;
MessageServer.CLIENT = CLIENT;