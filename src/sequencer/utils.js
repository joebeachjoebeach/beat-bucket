export function createPartEvents(sequence, baseNote) {
  const events = [];
  sequence.forEach((bucket, bucketIndex) => {
    bucket.notes.forEach(({ value }, noteIndex) => {
      const [ dur, time ] = getDurAndTime(bucket.notes.length, bucketIndex, noteIndex, baseNote);
      events.push({ note: value, dur, time, noteIndex, bucketIndex });
    });
  });
  return events;
}

function getDurAndTime(bucketLength, bucketIndex, noteIndex, baseNote) {
  const _dur = baseNote / bucketLength;
  const dur = `0:${_dur}`;
  const start = `0:${bucketIndex}`;
  const time = `${start} + 0:${noteIndex * _dur}`;
  return [dur, time];
}
