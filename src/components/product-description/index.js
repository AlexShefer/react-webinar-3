import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { numberFormat } from "../../utils";
import languages from '../../languages.json'
import './style.css';

function ProductDescription(props) {

  const cn = bem('ProductDescription');

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.description}</p>
      <ul className={cn('parameters')}>
        <li className={cn('parameters-title')}>{languages.country[props.currentLanguage]}
          <span className={cn('parameters-value')}>{props.madeIn?.title}</span>
        </li>
        <li className={cn('parameters-title')}>{languages.category[props.currentLanguage]}:
          <span className={cn('parameters-value')}>{props.category?.title}</span>
        </li>
        <li className={cn('parameters-title')}>{languages.year  [props.currentLanguage]}: 
          <span className={cn('parameters-value')}>{props.edition}</span>
        </li>
      </ul>
      <p className={cn('price')}>{languages.price[props.currentLanguage]}: {numberFormat(props.price, 'ru-Ru', {style: "currency", currency: "RUB"})}</p>
      {props.addBtn}
    </div>
  );
}

ProductDescription.propTypes = {
  loading: PropTypes.bool,
  description: PropTypes.string,
  madeIn: PropTypes.shape({
    title: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
  }),
  edition: PropTypes.number,
  price: PropTypes.number,
  currentLanguage: PropTypes.string.isRequired,
  addBtn: PropTypes.node,
};

ProductDescription.defaultProps = {
  loading: false,
  description: "",
  madeIn: {},
  category: {},
  edition: 0,
  price: 0,
  addBtn: null,
};

export default memo(ProductDescription);
