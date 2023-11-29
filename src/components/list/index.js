import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import { totalCost } from "../../utils";
import './style.css';

function List({list, action, btnText="Добавить", showTotalCost=false}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} action={action} btnText={btnText}/>
        </div>
      )}
      {!list.length ? <div className="List-empty">Корзина пуста</div> 
        : showTotalCost  &&
            <div className="List-total-cost">
              <div className="List-total-cost-title">{'Итого:'}</div>
              <div>{totalCost(list)}</div>
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
