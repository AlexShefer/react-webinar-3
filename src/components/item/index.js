import React, {useState} from "react";
import PropTypes from "prop-types";
import {formattedAmount} from "../../utils";
import './style.css';

function Item(props) {


  const callbacks = {
    btnAction: (e) => {
      props.action(props.item.code);

    },
  }
 
  return (
    <div className='Item' 
         >
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
          <div>{formattedAmount(props.item.price)} </div>
          {props.item.quantity && 
          <div className="Item-price-quantity">{props.item.quantity} шт</div>}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.btnAction} >
          {props.btnText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  action: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
};



export default React.memo(Item);
