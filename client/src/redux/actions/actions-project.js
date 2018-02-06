// PROJECT ACTIONS

export const PLAY = 'play';
export const STOP = 'stop';
export const CHANGE_PROJECT_NAME = 'change_project_name';
export const UPDATE_TEST_NOTE = 'update_test_note';

export const play = () => ({ type: PLAY });
export const stop = () => ({ type: STOP });

export const changeProjectName = ({ name }) => {
  return {
    type: CHANGE_PROJECT_NAME,
    payload: { name }
  };
};

export const updateTestNote = ({ on, value }) => {
  return {
    type: UPDATE_TEST_NOTE,
    payload: { on, value }
  };
};
