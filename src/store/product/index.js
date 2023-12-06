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
    })
  }

  async loadProduct() {
		console.log('loading');
		const productId = this.getState().productId
		
    try {
			console.log('start');
      this.setState({
        ...this.getState(),
        loading: true, // 
      })
      const response = await fetch(`/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState({
      ...this.getState(),
      ...json.result
    }, 'Загружен товар из АПИ');
    } catch(err) {
      console.error("Error loading data:", err);
    } finally {
			console.log('finish');
      this.setState({
        ...this.getState(),
        loading: false, // 
      })
			
    }
    
  }
}

export default Product;