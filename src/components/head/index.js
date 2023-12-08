import {memo} from "react";
import PropTypes from "prop-types";
import LanguageToggler from "../language-toggler";
import './style.css';

function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <LanguageToggler
          onChangeLanguage={props.onChangeLanguage}
          currentLanguage={props.currentLanguage}
        />
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  onChangeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
};

export default memo(Head);
