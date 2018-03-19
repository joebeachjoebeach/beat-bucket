import { COPY_BUCKET } from '../actions/actions-clipboard';

export default function(state = [], action) {
  switch (action.type) {

  case COPY_BUCKET:
    return action.payload;

  default:
    return state;
  }
}
