import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="notification">
      {message}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.string
};

export default Message;