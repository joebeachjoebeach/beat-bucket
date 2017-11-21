import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import './notebar.css';

import Note from '../note';

const Notebar = ({ octave }) => {                    
  const left = '<';
  const right = '>';

  return (                    
    <div className="notebar">                    
      <div>{left}</div>
      <div className="notebar-notes">
        <Note name="C#4" styleName="csharp" />
        <Note name="D#4" styleName="dsharp" />
        <Note name="F#4" styleName="esharp" />
        <Note name="G#4" styleName="fsharp" />
        <Note name="A#4" styleName="gsharp" />
        
        <Note name="C4" styleName="c" />
        <Note name="D4" styleName="d" />
        <Note name="E4" styleName="e" />
        <Note name="F4" styleName="f" />
        <Note name="G4" styleName="g" />
        <Note name="A4" styleName="a" />
        <Note name="B4" styleName="b" />
        <Note name="C5" styleName="c2" />
      </div>
      <div>{right}</div>
    </div>
  );                    
};

function mapStateToProps({ globals: { octave } }) {                            
  return { octave };                            
}                             

// function mapDispatchToProps(dispatch) {                            
//   return bindActionCreators(_, dispatch);                            
// }

export default connect(mapStateToProps)(Notebar);
