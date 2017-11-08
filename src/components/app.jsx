import React from 'react';
import Tone from 'tone';
import './app.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    // TODO
    // each track is { sequence, bpm?, base_note_value, voice }

    this.state = {
      playing: false,
      bpm: 75,
      tracks: [
        {
          sequence: [
            ['C4', 'D4'],
            ['E4'],
            ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4'],
            ['A4'],
            ['G4', 'F4', 'E4', 'D4'],
            ['C4'],
            ['C4', 'D4', 'E4'],
            ['C4']
          ]
        },
        {
          sequence: [
            ['C5', 'E5', 'G5', 'C5', 'E5', 'G5']
          ]
        }
      ]
    };
  }

  componentWillMount() {
    Tone.Transport.bpm.value = this.state.bpm;
  }

  // toggles playing
  play() {
    if (this.state.playing) {
      Tone.Transport.stop();
      this.setState({ playing: false });
    }
    else {
      this.setState({ playing: true });
      // generate a part for each track
      this.state.tracks.forEach(track => {
        const synth = new Tone.Synth().toMaster();
        const part = new Tone.Part((time, event) => {
          synth.triggerAttackRelease(event.note, event.dur, time);
        }, this.extractNotes(track.sequence));

        part.start(0);

        part.loop = true;
        part.loopEnd = `${track.sequence.length}*4n`;
      });

      Tone.Transport.start('+0.1');
    }
    
  }

  // TODO: (arr, base_note_value) so that you can set the base to 1/4 or 1/8 etc.
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

  // TODO: (..., base_note_value)
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
        <button 
          className="btn"
          onMouseDown={this.play.bind(this)}
        >
          Play
        </button>
      </div>
    );
  }
}

export default App;
