import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import { getTranslation } from '../../utils';
import './style.css';


const Navigation = (props) => {
  const cn = bem('Navigation');
  const translatedLink =getTranslation('home', props.currentLanguage, 'Home')
  return (
    <Link to='/' className={cn()}>{translatedLink}</Link>
  )
}

Navigation.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
};

export default Navigation
