// USER REDUCER
import { SET_USER, SAVE } from '../actions/actions-user.js';
import {
  CHANGE_PROJECT_NAME,
  SET_PROJECT_ID,
  LOAD_PROJECT,
  DELETE_PROJECT,
  CHANGE_BPM,
  CREATE_NEW_PROJECT } from '../actions/actions-project.js';
import { ADD_TRACK, DELETE_TRACK } from '../actions/actions-tracks.js';
import {
  MUTE,
  SOLO,
  UNMUTE,
  UNSOLO,
  CHANGE_BASE_NOTE,
  CHANGE_TRACK_NAME,
  UPDATE_TRACK_VOLUME } from '../actions/actions-track.js';
import {
  ADD_NOTE,
  DELETE_NOTE,
  MOVE_NOTE,
  ADD_BUCKET,
  DELETE_BUCKET } from '../actions/actions-sequence.js';


export default function(state = { email: null, id: null, canSave: true }, action) {
  let newState;

  switch (action.type) {
  case SET_USER:
    newState = { ...state };
    newState.email = action.payload.email;
    newState.id = action.payload.id;
    newState.canSave = true;
    return newState;

  case LOAD_PROJECT:
  case SET_PROJECT_ID:
  case SAVE:
    // if there's no id (e.g. loading a shared project), no change
    if (!action.payload.id)
      return state;
    newState = { ...state };
    newState.canSave = false;
    return newState;

  case CHANGE_BPM:
  case CREATE_NEW_PROJECT:
  case CHANGE_PROJECT_NAME:
  case DELETE_PROJECT:
  case ADD_TRACK:
  case DELETE_TRACK:
  case MUTE:
  case SOLO:
  case UNMUTE:
  case UNSOLO:
  case CHANGE_BASE_NOTE:
  case CHANGE_TRACK_NAME:
  case UPDATE_TRACK_VOLUME:
  case ADD_NOTE:
  case DELETE_NOTE:
  case MOVE_NOTE:
  case ADD_BUCKET:
  case DELETE_BUCKET:
    if (state.canSave)
      return state;
    newState = { ...state };
    newState.canSave = true;
    return newState;

  default:
    return state;
  }
}
