// TRACKS ACTIONS

export const ADD_TRACK = 'add_track';
export const DELETE_TRACK = 'delete_track';

export function addTrack() {
  return {
    type: ADD_TRACK
  };
}

export function deleteTrack({ trackId }) {
  return {
    type: DELETE_TRACK,
    payload: { trackId }
  };
}
