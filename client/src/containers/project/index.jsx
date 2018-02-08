// PROJECT

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import { changeProjectName, setProjectId } from '../../redux/actions/actions-project';
import { selectProject } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';

import './project.css';

import Tracks from '../tracks';
import EditableText from '../../components/editable-text';
import ProjectButtons from '../project-buttons';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { editingName: false, saving: false };

    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
  }

  handleNameClick() {
    this.setState({ editingName: true });
  }

  handleNameBlur() {
    this.setState({ editingName: false });
  }

  handleProjectNameChange(newName) {
    this.props.changeProjectName({ name: newName });
  }

  render() {
    const { name } = this.props;
    return this.props.connectDropTarget(
      <div className="project">
        <div className="project-header">
          <div className="project-title">
            <EditableText
              value={name}
              onInputChange={this.handleProjectNameChange}
            />
          </div>
          <ProjectButtons {...this.props} />
        </div>
        <Tracks />
      </div>
    );
  }
}

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
