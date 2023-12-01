import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartContent({children}) {

  return (
    <div className='CartContent'>
      {children}
    </div>
  );
}

CartContent.propTypes = {
  children: PropTypes.node
}

export default React.memo(CartContent);
