import React from 'react';
import {formatPluralMessage} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  /**
   * Обрабатывает удаление элемента.
   *
   * @param {React.MouseEvent} e - Событие клика.
   * @param {number} id - item.code - уникальный идентификатор удаляемого элемента.
   * @returns {void}
   */
  const handleDelete = (e, id) => {
    e.stopPropagation(e.target)
    store.deleteItem(id)
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                   {item.title}
                   {/* Добавляем отображение параметра item.selectionCount */}
                   {item.selectionCount > 0 ?`| Выделяли ${formatPluralMessage(item.selectionCount, 'раз', 'раза', 'раз')}`: '' }
                </div>
                <div className='Item-actions'>
                  <button onClick={(e) => handleDelete(e, item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
