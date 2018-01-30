export function createPartEvents(sequence, baseNote) {
  const events = [];

  // place a dummy 'rest' note in any empty bucket
  // this ensures that a previously played note doesn't light up in the view
  const mappedSequence = sequence.map(bucket => {
    if (bucket.length < 1)
      return [{ value: 'rest' }];
    return bucket;
  });
  mappedSequence.forEach((bucket, bucketIndex) => {
    bucket.forEach(({ value }, noteIndex) => {
      const [ dur, time ] =
        getDurAndTime(bucket.length, bucketIndex, noteIndex, baseNote);
      events.push({ value, dur, time, noteIndex, bucketIndex });
    });
  });
  return events;
}

function getDurAndTime(bucketLength, bucketIndex, noteIndex, baseNote) {
  const _dur = (baseNote / 4) / bucketLength;
  const dur = `0:${_dur}`;
  const start = `0:${bucketIndex * (baseNote / 4)}`;
  const time = `${start} + 0:${noteIndex * _dur}`;
  return [dur, time];
}
