// SIDEBAR

import React from 'react';
import { connect } from 'react-redux';
import './sidebar.css';

import Transport from '../transport';

const Sidebar = ({ trackNames }) => {
  function renderTrackNames() {
    return trackNames.map((name, i) => {
      return <div className="tracklist-name" key={i}>{name}</div>;
    });
  }

  return (
    <div className="sidebar">
      <Transport />
      <div className="tracklist">
        {renderTrackNames()}
      </div>
    </div>
  );
};

function mapStateToProps({ tracks }) {
  return { trackNames: tracks.map(track => track.name) };
}

// export default Sidebar;
export default connect(mapStateToProps)(Sidebar);
