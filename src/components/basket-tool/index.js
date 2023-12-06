import {memo} from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import languages from '../../languages.json'
import './style.css';

function BasketTool({sum, amount, onOpen, currentLanguage}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to='/' className={cn('link')}>{languages.home[currentLanguage]}</Link>
      <span className={cn('label')}>{languages.inTheCart[currentLanguage]}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, 
            {...languages.pluralProducts[currentLanguage]}
            )} / ${numberFormat(sum)} ₽`
          : languages.empty[currentLanguage]
        }
      </span>
      <button onClick={onOpen}>{languages.goToCart[currentLanguage]}</button>
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
