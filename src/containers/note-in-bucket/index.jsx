// NOTE-IN-BUCKET

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import './note-in-bucket.css';

const NoteInBucket = (props) => {                    

  return (
    <div className="note-in-bucket" />
  );                    
};

function mapStateToProps(state) {                            
  return state;                            
}                             

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators(_, dispatch);                            
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteInBucket);
