import React from 'react';
import Tone from 'tone';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sequence: [
        ['C4', 'D4'],
        ['E4'],
        ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4'],
        ['A4']
      ],
      bpm: 75,
      synth: new Tone.Synth().toMaster()
    };
  }

  componentWillMount() {
    Tone.Transport.bpm.value = this.state.bpm;
  }

  play() {
    const part = new Tone.Part((time, event) => {
      this.state.synth.triggerAttackRelease(event.note, event.dur, time);
    }, this.extractNotes(this.state.sequence));

    part.start(0);

    part.loop = 10;
    part.loopEnd = '1m';

    Tone.Transport.start('+0.1');
  }

  extractNotes(arr) {
    const result = [];
    arr.forEach((bucket, bucketIndex) => {
      bucket.forEach((note, noteIndex) => {
        const [ dur, time ] = this.getDurAndTime(bucket.length, bucketIndex, noteIndex);
        result.push({ note, dur, time });
      });
    });
    return result;
  }

  getDurAndTime(bucketLength, bucketIndex, noteIndex) {
    const _dur = 1 / bucketLength;
    const dur = `0:${_dur}`;
    const start = `0:${bucketIndex}`;
    const time = `${start} + 0:${noteIndex * _dur}`;
    return [dur, time];
  }

  render() {
    return (
      <div>
        Beatbucket Playtime
        <hr />
        <button onMouseDown={this.play.bind(this)}>Play</button>
      </div>
    );
  }
}

export default App;
