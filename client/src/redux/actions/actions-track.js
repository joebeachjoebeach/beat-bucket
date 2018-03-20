// TRACK ACTIONS

export const UPDATE_CURRENT_NOTE = 'update_current_note';
export const MUTE = 'mute';
export const SOLO = 'solo';
export const UNMUTE = 'unmute';
export const UNSOLO = 'unsolo';
export const CHANGE_BASE_NOTE = 'change_base_note';
export const CHANGE_TRACK_NAME = 'change_track_name';
export const UPDATE_TRACK_VOLUME = 'update_track_volume';
export const UPDATE_ATTACK = 'update_attack';
export const UPDATE_DECAY = 'update_decay';
export const UPDATE_SUSTAIN = 'update_sustain';
export const UPDATE_RELEASE = 'update_release';

export function updateCurrentNote({ bucketId, noteIndex, trackId }) {
  return {
    type: UPDATE_CURRENT_NOTE,
    payload: { bucketId, noteIndex, trackId }
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

export function changeTrackName({ name, trackId }) {
  return {
    type: CHANGE_TRACK_NAME,
    payload: { name, trackId }
  };
}

export function updateTrackVolume({ volume, trackId }) {
  return {
    type: UPDATE_TRACK_VOLUME,
    payload: { volume, trackId }
  };
}

export const updateAttack = ({ value, trackId }) => ({
  type: UPDATE_ATTACK,
  payload: { value, trackId }
});

export const updateDecay = ({ value, trackId }) => ({
  type: UPDATE_DECAY,
  payload: { value, trackId }
});

export const updateSustain = ({ value, trackId }) => ({
  type: UPDATE_SUSTAIN,
  payload: { value, trackId }
});

export const updateRelease = ({ value, trackId }) => ({
  type: UPDATE_RELEASE,
  payload: { value, trackId }
});


