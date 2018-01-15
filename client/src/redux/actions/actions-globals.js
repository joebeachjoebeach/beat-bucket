// GLOBALS ACTIONS

export const PLAY = 'play';
export const STOP = 'stop';
export const UPDATE_CURRENT_TRACK = 'update_current_track';
export const INCREMENT_OCTAVE = 'increment_octave';
export const DECREMENT_OCTAVE = 'decrement_octave';

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

export function updateCurrentTrack(trackId) {
  return {
    type: UPDATE_CURRENT_TRACK,
    payload: trackId
  };
}

export function incrementOctave() {
  return {
    type: INCREMENT_OCTAVE
  };
}

export function decrementOctave() {
  return {
    type: DECREMENT_OCTAVE
  };
}
