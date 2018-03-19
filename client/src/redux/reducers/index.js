import { combineReducers } from 'redux';
import project from './reducer-project';
import user from './reducer-user';
import clipboard from './reducer-clipboard';

const rootReducer = combineReducers({ project, user, clipboard });

export default rootReducer;
