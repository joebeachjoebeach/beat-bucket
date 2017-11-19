// NOTE

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import './note.css';

const Note = (props) => {                    

  return (
    <div className="note" />
  );                    
};

function mapStateToProps(state) {                            
  return state;                            
}                             

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators(_, dispatch);                            
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
