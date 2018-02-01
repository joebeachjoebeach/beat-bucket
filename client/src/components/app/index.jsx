// APP

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './app.css';

import Header from '../../containers/header';
import Project from '../../containers/project';
import NoteColumn from '../note-column';

class App extends React.Component {
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


export default DragDropContext(HTML5Backend)(App);
