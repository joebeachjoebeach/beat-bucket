// SEQUENCE ACTIONS

export const ADD_NOTE = 'add_note';
export const DELETE_NOTE = 'delete_note';
export const MOVE_NOTE = 'move_note';
export const ADD_BUCKET = 'add_bucket';
export const DELETE_BUCKET = 'delete_bucket';

export function addNote({ value, id=null, index, bucketId, trackId }) {
  return {
    type: ADD_NOTE,
    payload: { value, id, index, bucketId, trackId }
  };
}

export function deleteNote({ noteIndex, bucketId, trackId }) {
  return {
    type: DELETE_NOTE,
    payload: { noteIndex, bucketId, trackId }
  };
}

export function moveNote({ source, target }) {
  return {
    type: MOVE_NOTE,
    payload: { source, target }
  };
}

export function addBucket({ trackId }) {
  return {
    type: ADD_BUCKET,
    payload: { trackId }
  };
}

export function deleteBucket({ trackId, bucketId }) {
  return {
    type: DELETE_BUCKET,
    payload: { trackId, bucketId }
  };
}
