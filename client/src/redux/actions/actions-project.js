// PROJECT ACTIONS

export const PLAY = 'play';
export const STOP = 'stop';
export const CHANGE_PROJECT_TITLE = 'change_project_title';
export const UPDATE_TEST_NOTE = 'update_test_note';

export const play = () => ({ type: PLAY });
export const stop = () => ({ type: STOP });

export const changeProjectTitle = ({ title }) => {
  return {
    type: CHANGE_PROJECT_TITLE,
    payload: { title }
  };
};

export const updateTestNote = ({ on, value }) => {
  return {
    type: UPDATE_TEST_NOTE,
    payload: { on, value }
  };
};
