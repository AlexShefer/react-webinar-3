import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, action, actionType}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {action && <button onClick={action}>{actionType}</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  action: PropTypes.func,
  actionType: PropTypes.string,
};

export default React.memo(Head);
