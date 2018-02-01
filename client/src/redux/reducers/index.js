import { combineReducers } from 'redux';
import project from './reducer-project';
import user from './reducer-user';

const rootReducer = combineReducers({ project, user });

export default rootReducer;
