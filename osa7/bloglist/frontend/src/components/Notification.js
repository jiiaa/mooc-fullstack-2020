import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Message = () => {
  const message = useSelector(state => state.notification);

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