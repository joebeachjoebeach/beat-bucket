import { combineReducers } from 'redux';
// import TracksReducer from './reducer-tracks';
import ProjectReducer from './reducer-project';

// const rootReducer = combineReducers({ tracks: TracksReducer, project: ProjectReducer });
const rootReducer = combineReducers({ project: ProjectReducer });

export default rootReducer;
