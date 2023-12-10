import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 5,
      itemsPerPage: 10,
      loading: false,
      totalPages: 1
    }
  }

  setCurrentPage(page){
    this.setState({
      ...this.getState(),
      currentPage: page
    }, "Обновление номера страницы")
  }

  async load(language) {
    try {
      this.setState({
        ...this.getState(),
        loading: true, // 
      }, "Catalog is loading = true")
      const {itemsPerPage, currentPage} =  this.getState()
      const skip = (currentPage - 1) * itemsPerPage
      const response = await fetch(`/api/v1/articles?lang=${language}&limit=${itemsPerPage}&skip=${skip}&fields=items(_id,title,madeIn(title),category(title),description,edition,price),count`);
      const json = await response.json();
      const totalPages = Math.ceil(json.result.count / itemsPerPage);
      this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      totalPages: totalPages
    }, 'Загружены товары из АПИ');
    } catch(err) {
      console.error("Error loading data:", err);
    } finally {
      this.setState({
        ...this.getState(),
        loading: false, // 
      }, "Catalog is loading = false")
    }
    
  }
}

export default Catalog;
