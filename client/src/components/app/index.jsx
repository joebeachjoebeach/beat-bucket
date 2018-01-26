// APP

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './app.css';

import Header from '../header';
// import Sidebar from '../sidebar';
// import BucketHeader from '../bucket-header';
// import Track from '../../containers/track';

import Project from '../../containers/project';
// import Keyboard from '../keyboard';
import NoteColumn from '../note-column';

class App extends React.Component {

  // render() {
  //   return (
  //     <div className="app">
  //       <Header />
  //       <div className="wrapper">
  //         <Sidebar />
  //         <div className="subwrapper">
  //           <BucketHeader />
  //           <Track />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
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

/*

div 'app'
  Header
  div 'wrapper' (flex direction: row)
    Project
    Keyboard

*/

