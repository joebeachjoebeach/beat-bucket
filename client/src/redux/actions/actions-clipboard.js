export const COPY_BUCKET = 'copy_bucket';
export const PASTE_BUCKET = 'paste_bucket';

export function copyBucket(notes) {
  return {
    type: COPY_BUCKET,
    payload: notes.map(note => note.value)
  };
}

export function pasteBucket({ trackId, bucketId, notes }) {
  return {
    type: PASTE_BUCKET,
    payload: { trackId, bucketId, notes }
  };
}
