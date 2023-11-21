/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    // Проверяем наличие данных в sessionStorage
    const storedState = sessionStorage.getItem('appState');
   
    if (storedState) {
      const stateFromStorage = JSON.parse(storedState);
      this.state = {
        ...stateFromStorage
        };
    } else {
      // Вычисляем максимальное значение code (для первичной загрузки страницы)
      const initialMaxCode = initState.list
        ? Math.max(...initState.list.map(item => item.code), 0)
        : 0;
      this.state = {
        list: [...initState.list],
        //Добавляем максимальное значение code в state
        maxCode: initialMaxCode
      };
      // Сохраняем состояние в sessionStorage
      sessionStorage.setItem('appState', JSON.stringify(this.state))
    };
    
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
    // Сохраняем состояние в sessionStorage
    sessionStorage.setItem('appState', JSON.stringify(this.state))
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      // при добавление  элемента изменяем состояние maxCode
      maxCode: this.state.maxCode + 1,
      list: [...this.state.list, {code: this.state.maxCode + 1, title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        } 
        // Снятие выделение с не выбранного элемента
        else {
          item.selected = false
        }
        return item;
      })
    })
  }
}

export default Store;
