// GLOBALS ACTIONS

export const PLAY = 'play';
export const STOP = 'stop';
export const CHANGE_PROJECT_TITLE = 'change_project_title';

export const play = () => ({ type: PLAY });
export const stop = () => ({ type: STOP });

export const changeProjectTitle = ({ title }) => {
  return {
    type: CHANGE_PROJECT_TITLE,
    payload: { title }
  };
};
