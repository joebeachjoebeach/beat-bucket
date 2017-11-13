
const dummy = [
  {
    name: 'Track 1',
    sequence: [
      ['C4', 'D4'],
      ['E4'],
      ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4'],
      ['A4'],
      ['G4', 'F4', 'E4', 'D4'],
      ['C4'],
      ['C4', 'D4', 'E4'],
      ['C4']
    ],
    baseNote: 1
  },
  // {
  //   sequence: [
  //     ['C5', 'D5', 'E5']
  //   ],
  //   baseNote: 0.5
  // }
];

export default function TracksReducer(state = dummy, action) {
  return state;
}

