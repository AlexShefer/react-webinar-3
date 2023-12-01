import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { formattedAmount } from "../../utils";
import './style.css';

function List(props) {
  return (
    <div className='List'>
      {props.list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} action={props.action} btnText={props.btnText}/>
        </div>
      )}
      {!props.list.length ? <div className="List-empty">Корзина пуста</div> 
        : props.showTotalCost  &&
            <div className="List-total-cost">
              <div className="List-total-cost-title">{'Итого'}</div>
              <div>{formattedAmount(props.totalCost)}</div>
            </div>
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number
    })
  ),
  totalCost: PropTypes.number,
  itemsInCart: PropTypes.number,
  action: PropTypes.func,
  btnText: PropTypes.string,
  showTotalCost: PropTypes.bool,
};

List.defaultProps = {
  action: () => {},
  btnText: "Добавить",
  showTotalCost: false,
};

export default React.memo(List);
