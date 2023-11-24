const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Функция форматирования сообщения на основе правил множественного числа.
 *
 * @param {number} count - Количество элементов.
 * @param {string} singleForm - Форма слова для для чисел оканчивающихся на 1.
 * @param {string} fewForm - Форма слова для чисел оканчивающихся на 2, 3 или 4.
 * @param {string} manyForm - Форма слова для 0, 5 и более элементов, а также для чисел оканчивающихся на 11-14.
 * @returns {string} Форматированное сообщение.
 */
export const formatPluralMessage = (count, singleForm, fewForm, manyForm) => {
	// Создание объекта PluralRules
	const pluralRules = new Intl.PluralRules("ru", { type: "cardinal" });

	// Использование выбранной категории множественного числа для определения сообщения
	switch (pluralRules.select(count)) {
		case "one":
			return `${count} ${singleForm}`;
		case "few":
			return `${count} ${fewForm}`;
		case "many":
			return `${count} ${manyForm}`;
		case "other":
			return ``;
	}
};