import {combineReducers} from 'redux';
import {usersReducer, messagesReducer} from './messagerReducers';

export default combineReducers({
    users: usersReducer, 
    messages: messagesReducer});