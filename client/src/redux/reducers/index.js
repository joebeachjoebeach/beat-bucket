import { combineReducers } from 'redux';
import TracksReducer from './reducer-tracks';
import GlobalsReducer from './reducer-globals';

const rootReducer = combineReducers({ tracks: TracksReducer, globals: GlobalsReducer });

export default rootReducer;
