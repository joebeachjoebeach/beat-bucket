// PROJECT

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './project.css';

import Tracks from '../tracks';

const Project = (props) => {

  return (
    <div className="project">
      <div className="project-header">
        <div className="project-header-title">Project Title</div>
        <button className="project-playbutton">Play</button>
        <button className="project-savebutton">Save</button>
      </div>
      <Tracks />
    </div>
  );
};


function mapStateToProps(state) {
  return state;
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(_, dispatch);
// }

export default connect(mapStateToProps)(Project);
