import {memo, useCallback, useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Skeleton from '../../components/skeleton';
import ProductDescription from '../../components/product-description';
import languages from '../../languages.json'

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
  }

  
  useEffect(() => {
    callbacks.closeModal()
    callbacks.setProductId(productId);
    store.actions.product.loadProduct();
  }, [productId]);
  
  return (
    <PageLayout>
      <Head title={select.title}/>
      <BasketTool onOpen={callbacks.openModalBasket}
                  currentLanguage={select.currentLanguage} 
                  amount={select.amount}
                  sum={select.sum}/>
      
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
      
    </PageLayout>

  );
}

export default memo(Product);
