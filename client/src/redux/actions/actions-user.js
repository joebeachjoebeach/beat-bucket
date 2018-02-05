// USER ACTIONS

export const SET_USER = 'set_user';

export const setUser = ({ email, id }) => ({
  type: SET_USER,
  payload: { email, id }
});

