import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';


/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [showModal, setShowModal] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    addToCart: useCallback((item)=> {
      store.addToCart(item);
    }, [store]),

    removeFromCart: useCallback((item)=> {
      store.removeFromCart(item);
    }, [store]),

    openCart: () => {
      setShowModal(true)
    },

    closeCart: () => {
      setShowModal(false)
    }
  }
  
    return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} action={callbacks.openCart}/>
      <List list={list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            action = {callbacks.addToCart}
            />
      {showModal && <Modal
        onClose={callbacks.closeCart}
        actionBar={'some actionBar'}
      >
        <Head title='Корзина' action={callbacks.closeCart} actionType={'Закрыть'}/>
        <List list={cart}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            action = {callbacks.removeFromCart}
            btnText={'Удалить'}
            showTotalCost={true}
            />
        
      </Modal>}     
    </PageLayout>
    
  );
}

export default App;
