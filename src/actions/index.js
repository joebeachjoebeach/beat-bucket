export const PLAY = 'play';
export const STOP = 'stop';
export const UPDATE_CURRENT_NOTE = 'update_current_note';
export const UPDATE_CURRENT_TRACK = 'update_current_track';
export const TOGGLE_MUTE = 'toggle_mute';
export const TOGGLE_SOLO = 'toggle_solo';

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

// note[]; note[0] = bucket; note[1] = note;
export function updateCurrentNote(note) {
  return {
    type: UPDATE_CURRENT_NOTE,
    payload: note
  };
}

export function updateCurrentTrack(trackId) {
  return {
    type: UPDATE_CURRENT_TRACK,
    payload: trackId
  };
}

export function toggleMute(trackId) {
  return {
    type: TOGGLE_MUTE,
    payload: trackId
  };
}

export function toggleSolo(trackId) {
  return {
    type: TOGGLE_SOLO,
    payload: trackId
  };
}
