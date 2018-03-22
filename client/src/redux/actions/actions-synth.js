// TRACK ACTIONS

export const UPDATE_ATTACK = 'update_attack';
export const UPDATE_DECAY = 'update_decay';
export const UPDATE_SUSTAIN = 'update_sustain';
export const UPDATE_RELEASE = 'update_release';
export const UPDATE_OSCILLATOR_TYPE = 'update_oscillator_type';


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

export const updateOscillatorType = ({ type, trackId }) => ({
  type: UPDATE_OSCILLATOR_TYPE,
  payload: { type, trackId }
});

