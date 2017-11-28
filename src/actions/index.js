export const PLAY = 'play';
export const STOP = 'stop';
export const UPDATE_CURRENT_NOTE = 'update_current_note';
export const UPDATE_CURRENT_TRACK = 'update_current_track';
export const MUTE = 'mute';
export const SOLO = 'solo';
export const UNMUTE = 'unmute';
export const UNSOLO = 'unsolo';
export const ADD_NOTE = 'add_note';
export const DELETE_NOTE = 'delete_note';
export const MOVE_NOTE = 'move_note';

export function play() {
  return {
    type: PLAY
  };
}

export function stop() {
  return {
    type: STOP
  };
}

export function updateCurrentNote({ bucketIndex, noteIndex, trackId }) {
  return {
    type: UPDATE_CURRENT_NOTE,
    payload: { bucketIndex, noteIndex, trackId }
  };
}

export function updateCurrentTrack(trackId) {
  return {
    type: UPDATE_CURRENT_TRACK,
    payload: trackId
  };
}

export function mute(trackId) {
  return {
    type: MUTE,
    payload: trackId
  };
}

export function unmute(trackId) {
  return {
    type: UNMUTE,
    payload: trackId
  };
}

export function solo(trackId) {
  return {
    type: SOLO,
    payload: trackId
  };
}

export function unsolo(trackId) {
  return {
    type: UNSOLO,
    payload: trackId
  };
}

export function addNote({ note, index, bucketId, trackId }) {
  return {
    type: ADD_NOTE,
    payload: { note, index, bucketId, trackId }
  };
}

export function deleteNote({ noteIndex, bucketId, trackId }) {
  return {
    type: DELETE_NOTE,
    payload: { noteIndex, bucketId, trackId }
  };
}

// export function moveNote({ originalIndex, newIndex, bucketId, trackId }) {
//   return {
//     type: MOVE_NOTE,
//     payload: { originalIndex, newIndex, bucketId, trackId }
//   };
// }

export function moveNote(payload) {
  return {
    type: MOVE_NOTE,
    payload
  };
}
