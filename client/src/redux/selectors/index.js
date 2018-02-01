export function selectTracks(state) {
  return state.project.tracks;
}

export function selectTrack(id) {
  return state => state.project.tracks[id];
}

export function selectPlaying(state) {
  return state.project.playing;
}

export function selectBpm(state) {
  return state.project.bpm;
}

export function selectMuted(id) {
  return state => state.project.tracks[id].muted;
}

export function selectSequence(id) {
  return state => state.project.tracks[id].sequence;
}

export function selectTracksLength(state) {
  return Object.keys(state.project.tracks).length;
}

export function selectTrackExists(id) {
  return state => state.project.tracks[id] ? 1 : 0;
}

export function selectBaseNote(id) {
  return state => state.project.tracks[id].baseNote;
}

export function selectNextId(id) {
  return state => state.project.tracks[id].nextId;
}

export function selectOctave(state) {
  return state.project.octave;
}

export function selectProjectTitle(state) {
  return state.project.projectTitle;
}

export function selectTestNote(state) {
  return state.project.testNote;
}

export function selectTrackVolume(id) {
  return state => state.project.tracks[id].volume;
}

export function selectUsername(state) {
  return state.user.username;
}
