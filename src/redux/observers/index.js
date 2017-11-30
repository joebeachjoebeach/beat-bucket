import { selectTracks } from '../selectors/';

export function observeStore(store, select, onChange) {
  let currentState;

  const handleChange = () => {
    let newState;
    try {
      newState = select(store.getState());
    }
    catch (e) {
      return;
    }
    if (newState !== currentState) {
      currentState = newState;
      onChange(currentState);
    }
  };

  let unsubscribe = store.subscribe(handleChange);
  return unsubscribe;
}

export function observeTrackChange(store, newTrackHandler, deleteTrackHandler) {
  let currentState;

  const handleChange = () => {
    let newState = selectTracks(store.getState());
    let currentLength;
    if (currentState)
      currentLength = Object.keys(currentState).length;
    else
      currentLength = 1;
    let newLength = Object.keys(newState).length;
    if (newLength !== currentLength) {
      if (newLength > currentLength) {
        newTrackHandler(newState, currentState);
      }
      else if (newLength < currentLength) {
        deleteTrackHandler(newState, currentState);
      }
      currentState = newState;
    }
  };

  let unsubscribe = store.subscribe(handleChange);
  return unsubscribe;
}
