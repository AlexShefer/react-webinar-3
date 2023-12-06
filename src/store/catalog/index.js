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
    })
  }

  async load( ) {
    try {
      this.setState({
        ...this.getState(),
        loading: true, // 
      })
      
      const {itemsPerPage, currentPage} =  this.getState()
      const skip = (currentPage - 1) * itemsPerPage
      const response = await fetch(`/api/v1/articles?lang=en&limit=${itemsPerPage}&skip=${skip}&fields=items(_id,%20title,%20price),count`);
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
      })
    }
    
  }
}

export default Catalog;
