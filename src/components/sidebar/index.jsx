// SIDEBAR

import React from 'react';
import './sidebar.css';

import Transport from '../../containers/transport';
import TrackList from '../../containers/track-list';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Transport />
      <TrackList />
    </div>
  );
};

export default Sidebar;
