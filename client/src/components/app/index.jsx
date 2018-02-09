// APP

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user.js';
import { API_BASE_URL } from '../../utils';
import './app.css';

import Header from '../../containers/header';
import Project from '../../containers/project';
import NoteColumn from '../note-column';

class App extends React.Component {

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
        })
        .catch(() => { localStorage.removeItem('authToken'); });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="wrapper">
          <Project />
          <NoteColumn />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

const ddc_App = DragDropContext(HTML5Backend)(App);
export default connect(null, mapDispatchToProps)(ddc_App);
