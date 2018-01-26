export function selectTracks(state) {
  return state.tracks;
}

export function selectTrack(id) {
  return state => state.tracks[id];
}

export function selectPlaying(state) {
  return state.globals.playing;
}

export function selectBpm(state) {
  return state.globals.bpm;
}

export function selectMuted(id) {
  return state => state.tracks[id].muted;
}

export function selectSequence(id) {
  return state => state.tracks[id].sequence;
}

export function selectTracksLength(state) {
  return Object.keys(state.tracks).length;
}

export function selectTrackExists(id) {
  return state => state.tracks[id] ? 1 : 0;
}

export function selectBaseNote(id) {
  return state => state.tracks[id].baseNote;
}

export function selectNextId(id) {
  return state => state.tracks[id].nextId;
}

export function selectOctave(state) {
  return state.globals.octave;
}
