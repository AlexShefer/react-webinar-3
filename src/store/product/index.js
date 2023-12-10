import StoreModule from "../module";

class Product extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      productId: '',
    }
  }

  setProductId(productId){
    this.setState({
      ...this.getState(),
      productId: productId
    }, "Изменение ProductId")
  }

  async loadProduct(language) {
		const productId = this.getState().productId
		
    try {
      this.setState({
        ...this.getState(),
        loading: true, // 
      }, "Product is loading = true")
      const response = await fetch(`/api/v1/articles/${productId}?lang=${language}&fields=_id,title,madeIn(title),category(title),description,edition,price`);
      const json = await response.json();
      this.setState({
      ...this.getState(),
      ...json.result
    }, 'Загружен товар из АПИ по ID');
    } catch(err) {
      console.error("Error loading data:", err);
    } finally {
      this.setState({
        ...this.getState(),
        loading: false, // 
      }, "Product is loading = false")
			
    }
    
  }
}

export default Product;