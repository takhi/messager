import {UPDATE_USERS, UPDATE_USER_TYPING_STATUS, LOAD_BOARD, ADD_MESSAGE} from '../constants/messagerConstants';

export function updateUsers(users) {
    return {type: UPDATE_USERS, users: users}
}

export function updateUserTypyingStatus(status) {
    return {type: UPDATE_USER_TYPING_STATUS, status: status}
}

export function loadBoard(board) {
    return {type: LOAD_BOARD, board: board}
}

export function addMessage(message) {
    return {type: ADD_MESSAGE, message: message}
}
