export function selectTracks(state) {
  return state.project.tracks;
}

export function selectTrack(id) {
  return state => state.project.tracks[id];
}

export function selectPlaying(state) {
  return state.project.playing;
}

export function selectBPM(state) {
  return state.project.bpm;
}

export function selectMuted(id) {
  return state => state.project.tracks[id].muted;
}

export function selectSequence(id) {
  return state => state.project.tracks[id].sequence;
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

export function selectProject(state) {
  return state.project;
}

export function selectProjectName(state) {
  return state.project.name;
}

export function selectTestNote(state) {
  return state.project.testNote;
}

export function selectTrackVolume(id) {
  return state => state.project.tracks[id].volume;
}

export function selectEmail(state) {
  return state.user.email;
}

export function selectUserId(state) {
  return state.user.id;
}

export function selectCanSave(state) {
  return state.user.canSave;
}

export function selectProjectIdAndTrackCount(state) {
  return `${state.project.id},${Object.keys(state.project.tracks).length}`;
}

export function selectShared(state) {
  return state.project.shared;
}

export function selectProjects(state) {
  return state.user.projects;
}

export function selectClipboard(state) {
  return state.clipboard;
}

export function selectEnvelope(id) {
  return state => state.project.tracks[id].synth.envelope;
}

export function selectOscillator(id) {
  return state => state.project.tracks[id].synth.oscillator;
}

export function selectFilter(id) {
  return state => state.project.tracks[id].filter;
}

export function selectFilterFrequency(id) {
  return state => state.project.tracks[id].filter.frequency;
}
