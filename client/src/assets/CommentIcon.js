import React from 'react';

const CommentIcon = props => (
  <svg
    viewBox="0 0 20 20"
    width="1em"
    style={{ marginRight: '4px', marginTop: '2px' }}
    height="1em"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#999999"
      d="M19 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3v4a1.003 1.003 0 0 0 1.71.71l4.7-4.71H19c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zM4 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
    />
  </svg>
);

export default CommentIcon;
