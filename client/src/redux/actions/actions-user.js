// USER ACTIONS

export const SET_USER = 'set_user';
export const SAVE = 'save';

export const setUser = ({ email, id }) => ({
  type: SET_USER,
  payload: { email, id }
});

export const save = () => ({ type: SAVE });
