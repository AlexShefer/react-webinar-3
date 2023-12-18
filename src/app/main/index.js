import {memo, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();
  const {t, lang} = useTranslate();
  console.log(lang);
  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.load(lang);
    store.actions.catalog.setParams({lang: lang})
  }, [lang], true);

  

  

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </>
  );
}

export default memo(Main);
