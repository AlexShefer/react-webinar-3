import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { plural, formattedAmount } from "../../utils";
import './style.css';

function Controls(props) {
  
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине: {' '}
        <span className={cn("cart-content")}>
          {props.itemsInCart > 0 ? `${props.itemsInCart} ${plural(props.itemsInCart, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formattedAmount(props.totalCost)}` : "пусто" }
        </span>
         
      </div>
      <div className={cn("actions")}>
      <button onClick={() => props.action()}>Показать</button>
      </div>
        
      
    </div>
  )
}

Controls.propTypes = {
  action: PropTypes.func.isRequired,
  totalCost: PropTypes.number.isRequired,
  itemsInCart: PropTypes.number.isRequired,
};

Controls.defaultProps = {
  action: () => {},
};

export default React.memo(Controls);
