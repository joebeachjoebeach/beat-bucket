// ACCOUNT-BAR

import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import './account-bar.css';

const AccountBar = () => {

  return (
    <div className="account-bar">
      {/*Account*/}
    </div>
  );
};


function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AccountBar);
