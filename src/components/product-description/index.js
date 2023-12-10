import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { numberFormat, getTranslation } from "../../utils";
import Skeleton from '../skeleton'
import './style.css';

function ProductDescription(props) {

  const cn = bem('ProductDescription');

  const translation = {
    country: getTranslation('country', props.currentLanguage, 'Country'),
    category: getTranslation('category', props.currentLanguage, 'Category'),
    year: getTranslation('year', props.currentLanguage, 'Year'),
    price: getTranslation('price', props.currentLanguage, 'Price'),

  }

  return (
    <div className={cn()}>
      {!props.loading 
      ? (<>
          <p className={cn('description')}>{props.description}</p>
          <ul className={cn('parameters')}>
            <li className={cn('parameters-title')}>{translation.country}
              <span className={cn('parameters-value')}>{props.madeIn?.title}</span>
            </li>
            <li className={cn('parameters-title')}>{translation.category}:
              <span className={cn('parameters-value')}>{props.category?.title}</span>
            </li>
            <li className={cn('parameters-title')}>{translation.year}: 
              <span className={cn('parameters-value')}>{props.edition}</span>
            </li>
          </ul>
      </>) : (
        <Skeleton times={5} width="45%" height="45px"/>
      )}
      <p className={cn('price')}>{translation.price}: {numberFormat(props.price, 'ru-Ru', {style: "currency", currency: "RUB"})}</p>
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
