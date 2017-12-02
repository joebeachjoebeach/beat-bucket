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
      onChange(newState, currentState);
      currentState = newState;
    }
  };

  let unsubscribe = store.subscribe(handleChange);
  return unsubscribe;
}
