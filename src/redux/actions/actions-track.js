// TRACK ACTIONS

export const UPDATE_CURRENT_NOTE = 'update_current_note';
export const MUTE = 'mute';
export const SOLO = 'solo';
export const UNMUTE = 'unmute';
export const UNSOLO = 'unsolo';
export const CHANGE_BASE_NOTE = 'change_base_note';

export function updateCurrentNote({ bucketIndex, noteIndex, trackId }) {
  return {
    type: UPDATE_CURRENT_NOTE,
    payload: { bucketIndex, noteIndex, trackId }
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

export function changeBaseNote({ baseNote, trackId }) {
  return {
    type: CHANGE_BASE_NOTE,
    payload: { baseNote, trackId }
  };
}
