// APP

import React from 'react';
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

export default App;
