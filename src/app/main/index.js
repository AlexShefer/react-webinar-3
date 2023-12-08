import {memo, useCallback, useEffect,} from 'react';
import { useParams } from 'react-router-dom';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Skeleton from '../../components/skeleton';
import language from '../../languages.json'
import MainLayout from '../../components/main-layout';

function Main() {
  const store = useStore();
  const {page = 1} = useParams()

  const select = useSelector(state => ({
    list: state.catalog?.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    count: state.catalog.count,
    itemsPerPage: state.catalog.itemsPerPage,
    totalPages: state.catalog.totalPages,
    loading: state.catalog.loading,
    currentLanguage: state.language.currentLanguage

  }));
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменения currentPage
    setCurrentPage: useCallback((page) => {
        if (page) {
          store.actions.catalog.setCurrentPage(page);
        } 
        
    },[page]),
    setCurrentLanguage: useCallback(() => {
      store.actions.language.setCurrentLanguage(select.currentLanguage)
    }, [select.currentLanguage])
  }

    useEffect(() => {
    callbacks.setCurrentPage(page);
    store.actions.catalog.load();
  }, [page]);

  

  const renders = {
    item: useCallback((item) => {
      return <Item currentLanguage={select.currentLanguage}item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket, select.currentLanguage]),
  };

  return (
    <MainLayout
        title={language.title[select.currentLanguage]}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        currentLanguage={select.currentLanguage}
        onChangeLanguage={callbacks.setCurrentLanguage}
      >
      <List list={select?.list} renderItem={renders.item}/>
      <Pagination
        totalCount={select?.count}
        currentPage={parseInt(select.currentPage)}
        siblingCount={1}
        pageSize={select.itemsPerPage}
        totalPages={select.totalPages}
        />
    </MainLayout>

  );
}

export default memo(Main);
