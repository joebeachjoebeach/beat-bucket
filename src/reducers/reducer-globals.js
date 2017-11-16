import { PLAY, STOP, UPDATE_CURRENT_NOTE, UPDATE_CURRENT_TRACK } from '../actions';

const dummy_data = {
  bpm: 75,
  playing: false,
  currentNote: [0, 0],
  currentTrack: 0
};

export default function(state = dummy_data, action) {
  const { bpm, playing, currentNote, currentTrack } = state;

  switch (action.type) {
  case PLAY:
    return { bpm, currentNote, currentTrack, playing: true };

  case STOP:
    return { bpm, currentNote, currentTrack, playing: false };

  case UPDATE_CURRENT_NOTE:
    return { bpm, currentTrack, playing, currentNote: action.payload };

  case UPDATE_CURRENT_TRACK:
    return { bpm, playing, currentNote, currentTrack: action.payload };

  default:
    return state;

  }
}
