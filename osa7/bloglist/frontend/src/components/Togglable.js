import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ?  'none' : 'block' };
  const showWhenVisible = { display: visible ? 'block' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>{props.buttonText}</Button>
      </div>
      <div className="togglable-content" style={showWhenVisible}>
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;