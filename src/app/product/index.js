import {memo, useCallback, useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ProductDescription from '../../components/product-description';
import languages from '../../languages.json'
import MainLayout from '../../components/main-layout/index'

function Product() {
  const store = useStore();
  const { productId } = useParams()

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    title: state.product.title,
    description: state.product.description,
    madeIn: state.product.madeIn,
    price: state.product.price,
    edition: state.product.edition,
    category: state.product.category,
    loading: state.product.loading,
    currentLanguage: state.language.currentLanguage
  }));
  
	const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Закрытие модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
     // Изменения currentPage
    setProductId: useCallback((id) => {
      if (id) {
        store.actions.product.setProductId(id);
      } 
  },[productId]),

    setCurrentLanguage: useCallback(() => {
      store.actions.language.setCurrentLanguage(select.currentLanguage)
      }, [select.currentLanguage])
  }

  
  useEffect(() => {
    callbacks.setProductId(productId);
  }, [productId]);

  useEffect(() => {
    store.actions.product.loadProduct(select.currentLanguage);
  }, [productId, select.currentLanguage]);
  
  return (
    <MainLayout
        title={select.title}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        currentLanguage={select.currentLanguage}
        onChangeLanguage={callbacks.setCurrentLanguage}
      >
      <ProductDescription
        currentLanguage={select.currentLanguage}
        loading={select.loading}
        productId={productId}
        description={select.description}
        madeIn={select.madeIn}
        price={select.price}
        category={select.category}
        edition={select.edition}
        addBtn={
          <button onClick={() => callbacks.addToBasket(productId)}>{languages.addToCart[select.currentLanguage]}</button>
        }
      />
    </MainLayout>

  );
}

export default memo(Product);
