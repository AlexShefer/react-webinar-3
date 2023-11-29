import React, {useEffect} from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';;
    }
  })

  const cn = bem('Modal');
  return ReactDom.createPortal(
    <div className={cn()}>
        <div
            onClick={onClose}
            className={cn('overlay')}
        ></div>
        <div className={cn('content')}>
            <div className={cn('inner')}>
                {children}
            </div>
        </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  onClose: () => {
  },
}

export default Modal
