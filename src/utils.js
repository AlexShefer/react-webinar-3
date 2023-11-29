/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {*|string}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * Вариант с замыканием на начальное значение в самовызываемой функции.
 * @returns {Number}
 */
export const generateCode = (function (start = 0) {
  return () => ++start;
}());

/**
 * Генератор чисел с шагом 1
 * Вариант с генератором.
 * Сразу создаётся генератор и возвращается функция для получения следующего значения генератора
 * @returns {Number}
 */
export const generateCode1 = (function (start = 0) {
  function* realGenerator(start) {
    while (true) {
      yield ++start;
    }
  }

  const gen = realGenerator(start);
  return () => gen.next().value;
}());

/**
 * Генератор чисел с шагом 1
 * Вариант с использованием функции как объекта для хранения значения value
 * @returns {Number}
 */
export function generateCode2() {
  return generateCode2.value ? ++generateCode2.value : generateCode2.value = 1;
}
/**
 * Функция: formattedAmount
 * Описание: Форматирует переданное число в строку с валютой (рубли) согласно локации "ru-RU".
 * @param {number} amount - Число, которое нужно отформатировать.
 * @returns {string} - Отформатированная строка с валютой.
 */
export const formattedAmount = (amount) => new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(amount);

/**
 * Функция: totalCost
 * Описание: Рассчитывает общую стоимость списка товаров, умножая цену каждого товара на его количество и суммируя результаты.
 * @param {Array} list - Список товаров, каждый элемент которого имеет свойства 'quantity' (количество) и 'price' (цена).
 * @returns {string} - Общая стоимость в виде отформатированной строки с валютой (рубли).
 */
export const totalCost = (list) => {
  return formattedAmount(list.reduce((acc, curr) => acc + curr.quantity * curr.price, 0))
}