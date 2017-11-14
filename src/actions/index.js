export const PLAY = 'play';
export const STOP = 'stop';

export function play() {
  return {
    type: PLAY
  };
}

export function stop() {
  return {
    type: STOP
  };
}
