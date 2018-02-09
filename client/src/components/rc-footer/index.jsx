// RC-FOOTER

import React from 'react';
import './rc-footer.css';

const RCFooter = () => {

  return (
    <div className="rc-footer">
      <span>Made with ♥ at the </span>
      <a
        href="https://www.recurse-scout.com/loader.js?t=f8252f9ee6ff1f610bf63a6faf72a7df"
        target="_blank"
        rel="noopener noreferrer"
      >
        Recurse Center
      </a>
      <span> | </span>
      <a
        href="https://www.github.com/joebeachjoebeach/beat-bucket"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
    </div>
  );
};

export default RCFooter;
