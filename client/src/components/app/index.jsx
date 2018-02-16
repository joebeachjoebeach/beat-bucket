// APP

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, loadProjects } from '../../redux/actions/actions-user.js';
import { loadProject } from '../../redux/actions/actions-project';
import { useRefreshToken, resourceRequest, getSharedProject } from '../../utils';
import './app.css';

import Header from '../header';
import Project from '../project';
import NoteColumn from '../note-column';
import RCFooter from '../rc-footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.match.path !== '/',
      message: 'Loading...',
      error: false
    };
  }

  componentDidMount() {
    // use the refresh token to authenticate (if it exists)
    const { loadProjects, setUser } = this.props;
    useRefreshToken({
      success: res => {
        const { email, userId } = res.data;
        setUser({ email, id: userId });
        resourceRequest('get', 'projects', {
          success: res => { loadProjects(res.data.projects); },
          failure: () => { return; },
          authFailure: () => { return; }
        });
      },
    });

    // if we're at a /share/:id url, try to fetch the project
    const { path, params } = this.props.match;
    if (path === '/share/:id') {
      getSharedProject(params.id, {
        success: res => {
          res.data.project.shared = false;
          this.props.loadProject({ data: res.data.project, id: null });
          this.setState({ loading: false });
        },
        failure: () => {
          this.setState({
            message: 'Oops, we can\'t find that shared project. Please check the URL.',
            error: true
          });
        }
      });
    }
  }

  render() {
    const { loading, message, error } = this.state;
    if (loading || error) {
      return (
        <div className="app">
          <Header />
          <div className="wrapper">
            <div className="project">
              <div className="project-header">
                {message}
              </div>
            </div>
            <NoteColumn />
          </div>
          <RCFooter />
        </div>
      );
    }
    return (
      <div className="app">
        <Header />
        <div className="wrapper">
          <Project />
          <NoteColumn />
        </div>
        <RCFooter />
      </div>
    );

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser, loadProject, loadProjects }, dispatch);
}

const ddc_App = DragDropContext(HTML5Backend)(App);
export default connect(null, mapDispatchToProps)(ddc_App);
