// USER ACTIONS

export const SET_USER = 'set_user';
export const SAVE = 'save';
export const LOAD_PROJECTS = 'load_projects';

export const setUser = ({ email, id }) => ({
  type: SET_USER,
  payload: { email, id }
});

export const save = ({ id, name }) => ({
  type: SAVE,
  payload: { id, name }
});

export const loadProjects = (projects) => ({
  type: LOAD_PROJECTS,
  payload: projects
});
