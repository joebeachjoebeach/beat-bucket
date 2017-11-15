export function observeStore(store, select, onChange) {
  let currentState;

  const handleChange = () => {
    let newState = select(store.getState());
    if (newState !== currentState) {
      currentState = newState;
      onChange(currentState);
    }
  };

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

export function selectTracks(state) {
  return state.tracks;
}

export function selectPlaying(state) {
  return state.globals.playing;
}

export function selectCurrentTrack(state) {
  return state.globals.currentTrack;
}

export function selectBpm(state) {
  return state.globals.bpm;
}

export function selectMuted(id) {
  return state => {
    return state.tracks[id].muted;
  };
}
