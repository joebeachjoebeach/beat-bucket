// NOTE

import React from 'react';
import { connect } from 'react-redux';                        
// import { bindActionCreators } from 'redux';
import './note.css';

const Note = ({ name, styleName }) => {                    

  return (
    <div className={`note ${styleName}`}>
      {name}
    </div>
  );                    
};

function mapStateToProps(state) {                            
  return state;                            
}                             

// function mapDispatchToProps(dispatch) {                            
//   return bindActionCreators(_, dispatch);                            
// }

export default connect(mapStateToProps)(Note);
