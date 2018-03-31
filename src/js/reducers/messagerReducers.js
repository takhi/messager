import {UPDATE_USERS, UPDATE_USER_TYPING_STATUS, LOAD_BOARD, ADD_MESSAGE} from '../constants/messagerConstants';

export function usersReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_USERS:
            return action.users;
        case UPDATE_USER_TYPING_STATUS:
            let users = state.concat();
            for (let user of users) {
                if (user.name === action.status.user) {
                    user.isTyping = action.status.isTyping;
                    break;
                }
            }
            return users;
        default:
            return state;
    }
    return state;
}

export function messagesReducer(state = [], action) {
    switch(action.type) {
        case LOAD_BOARD:
            return action.board;
        case ADD_MESSAGE:
            return state.concat(action.message);
        default:
            return state;
    }
}