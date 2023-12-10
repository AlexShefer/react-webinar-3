import {memo} from 'react';
import PropTypes from 'prop-types'; 
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";
import Toolbar from '../tool-bar';


function MainLayout(props) {
  return (
    <PageLayout>
      <Head 
          title={props.title}
          onChangeLanguage={props.onChangeLanguage}
          currentLanguage={props.currentLanguage}
          />
      <Toolbar 
              onOpen={props.onOpen}
              amount={props.amount}
              sum={props.sum}
              currentLanguage={props.currentLanguage}/>
              {props.children}
    </PageLayout>

  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  onChangeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
  onOpen: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  children: PropTypes.node,
};

export default memo(MainLayout);
