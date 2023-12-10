import PropTypes from 'prop-types';
import BasketTool from '../basket-tool';
import Navigation from '../navigation';
import {cn as bem} from '@bem-react/classname';
import './style.css';


const Toolbar = (props) => {
  const cn = bem('ToolBar');
  return (
    <div className={cn()}>
      <Navigation 
          currentLanguage={props.currentLanguage}
          />
      <BasketTool
          onOpen={props.onOpen}
          amount={props.amount}
          sum={props.sum}
          currentLanguage={props.currentLanguage}/>
    </div>)

  
}

export default Toolbar