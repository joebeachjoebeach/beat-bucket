export function observeStore(store, select, onChange) {
  let currentState;

  const handleChange = () => {
    let newState;
    try {
      newState = select(store.getState());
    }
    // when listeners unsubscribe, handleChange will still run one more time, which will
    // sometimes throw an error, which we can ignore
    catch (e) {
      return;
    }
    if (newState !== currentState) {
      onChange(newState, currentState);
      currentState = newState;
    }
  };

  handleChange();
  let unsubscribe = store.subscribe(handleChange);
  return unsubscribe;
}
