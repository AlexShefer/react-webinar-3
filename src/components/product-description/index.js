import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { numberFormat } from "../../utils";
import './style.css';
import Skeleton from "../skeleton";

function ProductDescription(props) {
  console.log(props);
  const cn = bem('ProductDescription');

  

  return (
    <div className={cn()}>
      
      { !props.loading ? 
      <>
      <p className={cn('description')}>{props.description}</p>
      <ul className={cn('parameters')}>
        <li className={cn('parameters-title')}>Страна производитель
          <span className={cn('parameters-value')}>{props.madeIn?.title}</span>
        </li>
        <li className={cn('parameters-title')}>Категория:
          <span className={cn('parameters-value')}>{props.category?.title}</span>
        </li>
        <li className={cn('parameters-title')}>Год выпуска: 
          <span className={cn('parameters-value')}>{props.edition}</span>
        </li>
      </ul>
      <p className={cn('price')}>Цена: {numberFormat(props.price, 'ru-Ru', {style: "currency", currency: "RUB"})}</p>
      {props.addBtn}
      </>
      : <Skeleton times={6} width="45%" height="40px" />
    }
    </div>
  );
}

export default memo(ProductDescription);
