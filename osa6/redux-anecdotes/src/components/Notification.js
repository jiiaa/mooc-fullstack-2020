import React from 'react'
import { connect } from 'react-redux';
// import { useSelector } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector(state => state.notification);

  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  }

  if (!props.notification) {
    return null;
  }
  
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// export default connect(
//   (state) => ({ notification: state.notification })
// )(Notification);

const ConnectedNotes = connect(
  mapStateToProps
)(Notification);

// export default Notification;
export default ConnectedNotes;
