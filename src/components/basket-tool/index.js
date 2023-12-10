import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural, getTranslation} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, currentLanguage}) {
  const cn = bem('BasketTool');
  const translation = {
    inTheCart: getTranslation('inTheCart', currentLanguage, "inTheCart"),
    pluralProducts: getTranslation('pluralProducts', currentLanguage, {one:'product', few: 'products', many:'products'}),
    empty: getTranslation('empty', currentLanguage, "empty"),
    goToCart: getTranslation('goToCart', currentLanguage, "goToCart"),
  }
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translation.inTheCart}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 
            {...translation.pluralProducts}
            )} / ${numberFormat(sum)} ₽`
          : translation.empty
        }
      </span>
      <button onClick={onOpen}>{translation.goToCart}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  currentLanguage: PropTypes.string.isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
