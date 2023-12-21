import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';

function Main({translate}) {
  const store = useStore();
  const {t, lang, setLang} = translate;
  useInit(async () => {
    await Promise.all([
      store.actions.catalog.initParams(),
      store.actions.categories.load()
    ]);
  }, [lang], true);


  return (
    <PageLayout>
      <TopHead translate={translate}/>
      <Head title={t('title')}>
        <LocaleSelect lang={lang} setLang={setLang}/>
      </Head>
      <Navigation translate={translate}/>
      <CatalogFilter translate={translate}/>
      <CatalogList translate={translate}/>
    </PageLayout>
  );
}

export default memo(Main);
