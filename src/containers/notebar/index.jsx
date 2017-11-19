import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';

const Notebar = ({ octave }) => {                    

  return (                    
    <div />                    
  );                    
};

function mapStateToProps({ globals: { octave }}) {                            
  return { octave };                            
}                             

// function mapDispatchToProps(dispatch) {                            
//   return bindActionCreators(_, dispatch);                            
// }

export default connect(mapStateToProps)(Notebar);
