import uuidv4 from 'uuid/v4';

export const defaultFilter = () => ({
  frequency: 20000,
  type: 'lowpass',
  resonance: 1
});

export const defaultSynth = () => ({
  oscillator: {
    type: 'triangle',
    detune: 0
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1
  }
});

export function starterData() {
  const id1 = uuidv4();
  const id2 = uuidv4();
  return {
    bpm: 75,
    name: 'New Project',
    testNote: { on: false, value: '' },
    shared: false,
    tracks: {
      [id1]: {
        name: 'Track 1',
        sequence: [
          [{ id: 0, value: 'C4'}, { id: 1, value: 'D4' }],
          [{ id: 2, value: 'E4'}, { id: 3, value: 'F4'}],
          [{ id: 5, value: 'E4'}, { id: 6, value: 'rest'}],
          [{ id: 7, value: 'rest'}, { id: 8, value: 'D4'}],
        ],
        nextId: 9,
        baseNote: 4,
        id: id1,
        muted: false,
        soloed: false,
        currentNote: [],
        volume: 0,
        synth: defaultSynth(),
        filter: defaultFilter()
      },
      [id2]: {
        name: 'Track 2',
        sequence: [
          [{ id: 0, value: 'C5'}, { id: 1, value: 'D5' }, { id: 2, value: 'E5' }]
        ],
        nextId: 3,
        baseNote: 2,
        id: id2,
        muted: false,
        soloed: false,
        currentNote: [],
        volume: 0,
        synth: defaultSynth(),
        filter: defaultFilter()
      }
    }
  };
}

export function mario() {
  return {
    bpm: 100,
    name: 'Sample Project',
    shared: false,
    tracks: {
      '4ebd49bd-114c-46ab-a346-805eb554f1ef': {
        baseNote: 2,
        currentNote: [],
        id: '4ebd49bd-114c-46ab-a346-805eb554f1ef',
        muted: false,
        name: 'Coin',
        nextId: 17,
        sequence: [
          [],
          [
            {id: 13,value: 'rest'},
            {id: 16,value: 'rest'},
            {id: 11,value: 'rest'},
            {id: 14,value: 'B5'}
          ],
          [ { id: 15, value: 'E6' } ],
          [],
          [],
          [],
          []
        ],
        soloed: false,
        volume: -20,
        synth: defaultSynth(),
        filter: defaultFilter()
      },
      'bcfbc2d3-4e04-436a-8767-37353a0c4696': {
        baseNote: 4,
        currentNote: [],
        id: 'bcfbc2d3-4e04-436a-8767-37353a0c4696',
        muted: false,
        name: 'High Melody',
        nextId: 50,
        sequence: [
          [
            {id: 9, value: 'C5'},
            {id: 10, value: 'rest'},
            {id: 11, value: 'rest'},
            {id: 12, value: 'G4'}
          ],
          [
            {id: 23, value: 'rest'},
            {id: 14, value: 'rest'},
            {id: 13, value: 'E4'},
            {id: 24, value: 'rest'}
          ],
          [
            {id: 25, value: 'rest'},
            {id: 27, value: 'A4'},
            {id: 26, value: 'rest'},
            {id: 28, value: 'B4'}
          ],
          [
            {id: 29, value: 'rest'},
            {id: 30, value: 'A#4'},
            {id: 31, value: 'A4'},
            {id: 32, value: 'rest'}
          ],
          [
            {id: 33,value: 'G4'},
            {id: 34,value: 'E5'},
            {id: 35,value: 'G5'}
          ],
          [
            {id: 36,value: 'A5'},
            {id: 37,value: 'rest'},
            {id: 38,value: 'F5'},
            {id: 39,value: 'G5'}
          ],
          [
            {id: 40,value: 'rest'},
            {id: 41,value: 'E5'},
            {id: 15,value: 'rest'},
            {id: 42,value: 'C5'}
          ],
          [
            {id: 43,value: 'D5'
            },
            {id: 44,value: 'B4'},
            {id: 17,value: 'rest'},
            {id: 22,value: 'rest'}
          ]
        ],
        soloed: false,
        volume: 2,
        synth: defaultSynth(),
        filter: defaultFilter()
      },
      'cba856c2-2d3b-4fb5-b31e-0a430c713f90': {
        baseNote: 4,
        currentNote: [],
        id: 'cba856c2-2d3b-4fb5-b31e-0a430c713f90',
        muted: false,
        name: 'Harmony Melody',
        nextId: 42,
        sequence: [
          [
            {id: 0, value: 'E4'},
            {id: 2, value: 'rest'},
            {id: 1, value: 'rest'},
            {id: 3, value: 'C4'}
          ],
          [
            {id: 5, value: 'rest'},
            {id: 4, value: 'rest'},
            {id: 6, value: 'G3'},
            {id: 7, value: 'rest'}
          ],
          [
            {id: 8, value: 'rest'},
            {id: 9, value: 'C4'},
            {id: 10, value: 'rest'},
            {id: 11, value: 'D4'}
          ],
          [
            {id: 13, value: 'rest'},
            {id: 32, value: 'C#4'},
            {id: 15, value: 'C4'},
            {id: 12, value: 'rest'}
          ],
          [
            {id: 16, value: 'C4'},
            {id: 17, value: 'G4'},
            {id: 18, value: 'B4'}
          ],
          [
            {id: 31, value: 'C5'},
            {id: 20, value: 'rest'},
            {id: 21, value: 'A4'},
            {id: 22, value: 'B4'}
          ],
          [
            {id: 23, value: 'rest'},
            {id: 24, value: 'A4'},
            {id: 25, value: 'rest'},
            {id: 26, value: 'E4'}
          ],
          [
            {id: 27, value: 'F4'},
            {id: 28, value: 'D4'},
            {id: 29, value: 'rest'},
            {id: 30, value: 'rest'}
          ]
        ],
        soloed: false,
        volume: -6,
        synth: defaultSynth(),
        filter: defaultFilter()
      },
      'cdf1002a-1c03-4f50-915d-7c7b3764d961': {
        baseNote: 8,
        currentNote: [],
        id: 'cdf1002a-1c03-4f50-915d-7c7b3764d961',
        muted: false,
        name: 'Bass',
        nextId: 37,
        sequence: [
          [ { id: 14, value: 'C3' }, { id: 32, value: 'G2' } ],
          [ { id: 33, value: 'F2' }, { id: 34, value: 'E2' } ],
          [ { id: 22, value: 'E3' }, { id: 23, value: 'F3' } ],
          [ { id: 27, value: 'E3' }, { id: 28, value: 'D3' } ]
        ],
        soloed: false,
        volume: 0,
        synth: defaultSynth(),
        filter: defaultFilter()
      }
    },
    playing: false,
    testNote: {
      on: false,
      value: ''
    }
  };
}