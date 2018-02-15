// APP

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, loadProjects } from '../../redux/actions/actions-user.js';
import { loadProject } from '../../redux/actions/actions-project';
import { API_BASE_URL } from '../../utils';
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
    // if there is a saved jwt, check if it's valid and sign them in
    const jwt = localStorage.getItem('authToken');
    if (jwt) {
      axios.get(
        `${API_BASE_URL}auth/verify`,
        { headers: { Authorization: `Bearer ${jwt}`} }
      )
        .then(res => {
          const { email, userId } = res.data;
          this.props.setUser({ email, id: userId });
          axios.get(
            `${API_BASE_URL}projects`,
            { headers: { Authorization: `Bearer ${jwt}`} }
          )
            .then(res => {
              this.props.loadProjects(res.data.projects);
            })
            .catch(e => {
              console.log(e);
              if (e.response) console.log(e.response.data);
            });
        })
        .catch(() => { localStorage.removeItem('authToken'); });
    }

    // if we're at a /share/:id url, try to fetch the project
    const { path, params } = this.props.match;
    if (path === '/share/:id' && !isNaN(params.id)) {
      axios.get(`${API_BASE_URL}project/shared/${params.id}`)
        .then(res => {
          res.data.project.shared = false;
          this.props.loadProject({ data: res.data.project });
          this.setState({ loading: false });
        })
        .catch(() => {
          this.setState({
            message: 'Oops, we can\'t find that shared project. Please check the URL.',
            error: true
          });
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
