import { createPartEvents } from './utils.js';

const sequence = [
  [{id: 0, value: 'A4'}],
  [{id: 1, value: 'B4'}, {id: 2, value: 'C4'}],
  [{id: 3, value: 'D4'}]
];

describe('createPartEvents', () => {
  it('returns an array', () => {
    expect(Array.isArray(createPartEvents(sequence, 1))).toBe(true);
  });

  it('extracts the right number of notes', () => {
    expect(createPartEvents(sequence, 1).length).toBe(4);
  });

  // todo:
  // flesh out the expected object -- also can you make it work with all of the notes?
  it('creates objects with appropriate keys', () => {
    expect(createPartEvents(sequence, 1)[0]).toMatchObject({ note: 'A4' });
  });
});
