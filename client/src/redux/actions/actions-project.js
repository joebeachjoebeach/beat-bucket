// PROJECT ACTIONS

export const PLAY = 'play';
export const STOP = 'stop';
export const CHANGE_PROJECT_NAME = 'change_project_name';
export const UPDATE_TEST_NOTE = 'update_test_note';
export const SET_PROJECT_ID = 'set_project_id';
export const LOAD_PROJECT = 'load_project';
export const DELETE_PROJECT = 'delete_project';

export const play = () => ({ type: PLAY });
export const stop = () => ({ type: STOP });

export const changeProjectName = ({ name }) => ({
  type: CHANGE_PROJECT_NAME,
  payload: { name }
});

export const updateTestNote = ({ on, value }) => ({
  type: UPDATE_TEST_NOTE,
  payload: { on, value }
});

export const setProjectId = ({ id }) => ({
  type: SET_PROJECT_ID,
  payload: { id }
});

export const loadProject = ({ data, id }) => ({
  type: LOAD_PROJECT,
  payload: { data, id }
});

export const deleteProject = () => ({
  type: DELETE_PROJECT
});
