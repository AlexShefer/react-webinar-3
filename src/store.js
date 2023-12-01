import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }


  /**
   * Добавление товара в корзину
   * @param itemCode - id добавляемого компонента
   */
  addToCart(itemCode) {
    const addingItem = this.state.list.find((listItem => listItem.code === itemCode))
    const existingCartItem =this.state.cart.find(cartItem => cartItem.code === itemCode);

    if (existingCartItem) {
      // Если товар уже есть в корзине, обновляем количество элементов
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem =>
          cartItem.code === itemCode
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
        totalCost: this.state.totalCost + addingItem.price
      });
    } else {
      // Если товара нет в корзине, добавляем его еко в корзину в количестве 1
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...addingItem, quantity: 1 }],
        itemsInCart: this.state.itemsInCart + 1,
        totalCost: this.state.totalCost + addingItem.price
        
      });
    }

    
  };
  /**
   * Удаление записи из корзины
   * @param itemCode - id добавляемого компонента 
   */

  removeFromCart(itemCode){
    const removingItem = this.state.cart.find((cartItem => cartItem.code === itemCode))
    this.setState({
      ...this.state,
      cart: [
        ...this.state.cart.filter((el) => el.code !== itemCode)       
      ],
      totalCost: this.state.totalCost - removingItem.price * removingItem.quantity,
      itemsInCart: this.state.itemsInCart - 1

    });
  }
}

export default Store;
