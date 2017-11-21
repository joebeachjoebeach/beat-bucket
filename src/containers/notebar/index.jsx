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
        <Note name="C#" styleName="csharp" />
        <Note name="D#" styleName="dsharp" />
        <Note name="F#" styleName="esharp" />
        <Note name="G#" styleName="fsharp" />
        <Note name="A#" styleName="gsharp" />
        
        <Note name="C" styleName="c" />
        <Note name="D" styleName="d" />
        <Note name="E" styleName="e" />
        <Note name="F" styleName="f" />
        <Note name="G" styleName="g" />
        <Note name="A" styleName="a" />
        <Note name="B" styleName="b" />
        <Note name="C" styleName="c2" />
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
