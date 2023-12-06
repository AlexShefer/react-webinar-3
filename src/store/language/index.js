import StoreModule from "../module";

class Language extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      currentLanguage: 'en',
    }
  }

  setCurrentLanguage(language){
    this.setState({
      ...this.getState(),
      currentLanguage: language === 'ru' ? 'en' : 'ru'
    })
  }

}

export default Language;