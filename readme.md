# Домашнее задание №2

Данный проект является решением для домашнего задания №2.

1. [Задача 1](#задача-1)
2. [Задача 2](#задача-2)
3. [Задача 3](#задача-3)

## Задача 1

Доработать выделение записей, чтобы при выделении сбрасывалось выделения у других записей. Клик по выделенной записи тоже отменяет выделение.

### Решение:

Исправляем метод selectItem(code) класса Store.
добавление условия else снимает выделение c не выбранных элементов.

```
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
```

## Задача 2.

Доработать создание новой записи. Если обратили внимание код у новой записи формируется на основе размера массива, что не гарантирует уникальности кода. Реализуйте генератор уникальных чисел в рамках сессии. Генерировать огромные числа не надо, просто обеспечивается неповторимость кодов. Код записи - это не её порядковый номер. Выводится код записи. Если удалить последнюю запись с кодом 7, то при добавлении новой код будет равен 8. Записи с кодом 7 больше не будет в списке.

### Решение

Добавляем параметр `maxCode` в `state`.

```
// Вычисляем максимальное значение code (для первичной загрузки страницы)
const initialMaxCode = initState.list
    ? Math.max(...initState.list.map(item => item.code), 0)
    : 0;

this.state = {
    list: [...initState.list],
    //Добавляем максимальное значение code в state
     maxCode: initialMaxCode
}
```

Сохраняем `state` в `sessionStorage`

```
sessionStorage.setItem('appState', JSON.stringify(this.state))

```

Добавляем в `constructor` проверку наличия данных в `sessionStorage`

```
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
```

Добавляем в `setState(newState)` метод обновление параметра `maxCode` и обновление sessionStorage:

```
setState(newState) {
    this.state = newState;
    // Сохраняем состояние в sessionStorage
    sessionStorage.setItem('appState', JSON.stringify(this.state))
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
```

## Задача 3.
