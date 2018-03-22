import React from 'react';

// adapted from: https://commons.wikimedia.org
export default ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1000"
    height="750"
    viewBox="0 0 1000 750"
    stroke="currentColor"
    strokeWidth="60"
    fill="none"
    className={className}
  >
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      d="m41,373V142h306v462h306V142h306v231"
    />
  </svg>
);
