/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
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
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Функция: organizeCategories
 * Описание: Организует категории в иерархическую структуру на основе родительских связей.
 * @param {Array} categories - Массив объектов категорий для организации.
 * @returns {Array} - Возвращает массив организованных категорий с учетом иерархии родительских связей.
 */
export function organizeCategories(categories) {
  const categoryMap = new Map();

  // создаем карту индикаторов категорий
  categories.forEach((category) => {
      categoryMap.set(category._id, category);
  });

  const organizedCategories = [];

  // Итерируем по категориям, чтобы построить иерархию
  categories.forEach((category) => {
      if (category.parent) {
          const parentCategory = categoryMap.get(category.parent._id);
          if (parentCategory) {
              // Если родительская категория существует, добавляем текущую категорию как субкатегория
              if (!parentCategory.children) {
                  parentCategory.children = [];
              }
              parentCategory.children.push(category);
          }
      } else {
          // Если у категории нет родительского элемента, это категория верхнего уровня
          organizedCategories.push(category);
      }
  });

  return organizedCategories;
}

/**
 * Рекурсивная функция для получения идентификаторов всех дочерних элементов
 *
 * @param {Object} category - Категория, для которой нужно получить идентификаторы.
 * @returns {Array} - Массив идентификаторов всех дочерних элементов
 */
const getCategoryIdsRecursive = (category) => {
  let ids = [category._id];
  if (category.children) {
    category.children.forEach((child) => {
      // Рекурсивно собираем идентификаторы для дочерних 
      ids = [...ids, ...getCategoryIdsRecursive(child)];
    });
  }
  return ids;
};

/**
 * Функция для выравнивания иерархической структуры категорий в плоский список с учетом идентификаторов всех дочерних и поддочерних элементов.
 *
 * @param {Array} categories - Массив категорий.
 * @param {number} depth - Текущий уровень глубины вложенности (используется для визуального представления иерархии).
 * @returns {Array} - Плоский список категорий с учетом идентификаторов всех дочерних и поддочерних элементов.
 */
export const flattenCategoriesWithChildIds = (categories, depth = 0, parentId = null) => {
  const categoryOptions = [];

  categories.forEach((category) => {
    const titlePrefix = Array(depth).fill("-").join(" ");
    const option = {
      id: category._id,
      value: getCategoryIdsRecursive(category),
      title: `${titlePrefix} ${category.title}`,
      parent: parentId,
    };
    categoryOptions.push(option);

    if (category.children) {
      
      categoryOptions.push(...flattenCategoriesWithChildIds(category.children, depth + 1, category._id));
    }
  });

  return categoryOptions;
};

/**
 * Функция для выравнивания иерархической структуры категорий в плоский список с учетом идентификаторов только текущего элемента.
 *
 * @param {Array} categories - Массив категорий.
 * @param {number} depth - Текущий уровень глубины вложенности (используется для визуального представления иерархии).
 * @returns {Array} - Плоский список категорий с учетом идентификаторов только текущего элемента.
 */

export const flattenCategoriesWithOwnId = (categories, depth = 0, parentId = null) => {
  const categoryOptions = [];

  categories.forEach((category) => {
    const titlePrefix = Array(depth).fill("-").join(" ");
    const option = {
      id: category._id, // Use the category's _id as the identifier
      value: [category._id], // Include only the current category's id, not child ids
      title: `${titlePrefix} ${category.title}`,
      parent: parentId,
    };
    categoryOptions.push(option);

    if (category.children) {
      
      categoryOptions.push(...flattenCategoriesWithOwnId(category.children, depth + 1, category._id));
    }
  });

  return categoryOptions;
};

/**
 * Преобразует объект с параметрами поиска в строку запроса.
 *
 * @param {Object} searchParams - Объект, содержащий параметры поиска.
 * @returns {string|null} - Строка запроса, сгенерированная из предоставленных параметров поиска, или null, если параметры не предоставлены.
 * @example
 * // Использование
 * const searchParams = { key1: 'value1', key2: 'value2' };
 * const queryString = objectToQueryString(searchParams);
 * // Результат: "?key1=value1&key2=value2"
 */
export const objectToQueryString = (searchParams) => {
  if (searchParams) {
    return new URLSearchParams(searchParams);
  } else {
    return null;
  }
};