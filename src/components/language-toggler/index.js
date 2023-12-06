import {memo, useCallback} from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import './style.css';

function LanguageToggler(props) {

  const store = useStore()

  const currentLanguage = useSelector((state)=> state.language.currentLanguage)
  const language = useSelector((state)=> state.language)

  const callbacks = {
    changeLanguage: useCallback(() => store.actions.language.setCurrentLanguage(language.currentLanguage), [store, language.currentLanguage]),
  };

  return (
    <div className='LanguageToggler'>
      <button onClick={callbacks.changeLanguage}>{currentLanguage === 'ru' ? "EN 🌐" : "RU 🌐"}</button>
    </div>
  )
}


export default memo(LanguageToggler);
