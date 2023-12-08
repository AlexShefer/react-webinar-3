import {memo} from 'react';
import PropTypes from 'prop-types'; 
import PageLayout from "../page-layout";
import Head from "../head";
import BasketTool from "../basket-tool";


function MainLayout(props) {

  return (
    <PageLayout>
      <Head 
          title={props.title}
          onChangeLanguage={props.onChangeLanguage}
          currentLanguage={props.currentLanguage}
          />
      <BasketTool onOpen={props.onOpen}
                  amount={props.amount}
                  sum={props.sum}
                  currentLanguage={props.currentLanguage}/>
      {props.children}
    </PageLayout>

  );
}

MainLayout.propTypes = {
  title: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(MainLayout);
