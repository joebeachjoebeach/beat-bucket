// PROJECT

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import { changeProjectName, setProjectId } from '../../redux/actions/actions-project';
import { selectProject } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';

import './project.css';

import Tracks from '../tracks';
import EditableText from '../editable-text';
import ProjectButtons from '../project-buttons';

const Project = props => {
  return props.connectDropTarget(
    <div className="project">
      <div className="project-header">
        <div className="project-title">
          <EditableText
            value={props.name}
            title="edit project title"
            onBlur={value => { props.changeProjectName({ name: value }); }}
          />
        </div>
        <ProjectButtons {...props} />
      </div>
      <Tracks />
    </div>
  );
};

const projectTarget = {
  drop(_, monitor) {
    // if it's been dropped on a child target, don't do anything
    if (monitor.didDrop())
      return;
    return { target: 'delete' };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state) {
  return { ...selectProject(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeProjectName, setProjectId }, dispatch);
}

const dt_Project = DropTarget(ItemTypes.NOTE, projectTarget, collect)(Project);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Project);
