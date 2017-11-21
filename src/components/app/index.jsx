// APP

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './app.css';

import Header from '../header';
import Sidebar from '../../containers/sidebar';
import BucketHeader from '../../containers/bucket-header';
import Track from '../../containers/track';

class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header />
        <div className="wrapper">
          <Sidebar />
          <div className="subwrapper">
            <BucketHeader />
            <Track />
          </div>
        </div>
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
// export default App;
