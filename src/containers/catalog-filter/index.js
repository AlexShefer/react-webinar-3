import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    category: state.catalog.params.category
  }));

  const {t,lang} = useTranslate()

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтрация 
    onFilter: useCallback((categoryId) => {
      store.actions.catalog.setParams({ category: categoryId, page: 1 })
    }, [store,  select.categories]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: t('sort.order')},
      {value: `title.${lang}`, title: t('sort.name')},
      {value: '-price', title: t('sort.price')},
      {value: 'edition', title: t('sort.edition')},
    ]), [lang]),
    category: useMemo(() => {
      const allCategory = {value: "", title: t('filter.all') };
      
      return [allCategory, ...select.categories];
    }, [select.categories, t]),
    
  };

  

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onFilter} theme={'small'}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} theme={'small'}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={t('filter.search')} theme={'medium'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
