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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    console.log(code);
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
      cart: []
    })
  };

  /**
   * Добавление товара в корзину
   * @param item
   */
  addToCart(item) {
    const existingCartItem =this.state.cart.find(cartItem => cartItem.code === item.code);

    if (existingCartItem) {
      // Если товар уже есть в корзине, обновляем количество элементов
      this.setState({
        ...this.state,
        cart: this.state.cart.map(cartItem =>
          cartItem.code === item.code
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      });
    } else {
      // Если товара нет в корзине, добавляем его еко в корзину в количестве 1
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }]
      });
    }

    
  };
  /**
   * Удаление записи из корзины
   * @param code
   */

  removeFromCart(item){
    this.setState({
      ...this.state,
      cart: [
        ...this.state.cart.filter((el) => el.code !== item.code)       
      ]
    });
  }
}

export default Store;
