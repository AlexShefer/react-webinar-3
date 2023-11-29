import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { plural, totalCost } from "../../utils";
import './style.css';

function Controls({action, cart}) {
  
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn("cart")}>
        В корзине: {' '}
        <span className={cn("cart-content")}>
          {cart.length ? `${cart.length} ${plural(cart.length, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalCost(cart)}` : "пусто" }
        </span>
         
      </div>
      <div className={cn("actions")}>
      <button onClick={() => action()}>Показать</button>
      </div>
        
      
    </div>
  )
}

Controls.propTypes = {
  action: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  action: () => {},
};

export default React.memo(Controls);
