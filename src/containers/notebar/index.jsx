import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import './notebar.css';

const Notebar = ({ octave }) => {                    
  const left = '<';
  const right = '>';

  return (                    
    <div className="notebar">                    
      <div>{left}</div>
      <div className="notebar-notes">
        <div className="note csharp">C#</div>
        <div className="note dsharp">D#</div>
        <div className="note esharp">F#</div>
        <div className="note fsharp">G#</div>
        <div className="note gsharp">A#</div>
        
        <div className="note c">C</div>
        <div className="note d">D</div>
        <div className="note e">E</div>
        <div className="note f">F</div>
        <div className="note g">G</div>
        <div className="note a">A</div>
        <div className="note b">B</div>
        <div className="note c2">C</div>
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
