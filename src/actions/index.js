export const PLAY = 'play';
export const STOP = 'stop';
export const UPDATE_CURRENT_NOTE = 'update_current_note';
export const UPDATE_CURRENT_TRACK = 'update_current_track';
export const MUTE = 'mute';
export const SOLO = 'solo';
export const UNMUTE = 'unmute';
export const UNSOLO = 'unsolo';

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
