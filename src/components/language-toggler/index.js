import {memo} from 'react';
import PropTypes from 'prop-types'; 
import './style.css';

function LanguageToggler(props) {

  return (
    <div className='LanguageToggler'>
      <button onClick={props.onChangeLanguage}>{props.currentLanguage === 'ru' ? "EN 🌐" : "RU 🌐"}</button>
    </div>
  )
}

LanguageToggler.propTypes = {
  onChangeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};


export default memo(LanguageToggler);
