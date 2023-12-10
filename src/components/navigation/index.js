import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import languages from '../../languages.json'
import './style.css';


const Navigation = (props) => {
  const cn = bem('Navigation');
  return (
    <Link to='/' className={cn()}>{languages.home[props.currentLanguage]}</Link>
  )
}

export default Navigation
