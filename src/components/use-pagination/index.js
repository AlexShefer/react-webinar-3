import { useMemo } from "react";

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
		totalPages
  }) => {
    const paginationRange = useMemo(() => {
       // Количество страниц которые которые вмещают каталог
    const totalPageCount = 55;

    /*
    Количество страниц определяется как количество Sibling элементов
    + Первая страница + Последняя страница + Текущая страница + 2*ТОЧКИ
    */
    const totalPageNumbers = siblingCount + 5;

    function range(start, end) {
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    }
    /*
    Случай 1:
    Если количество страниц меньше, чем номера страниц, которые мы хотим отобразить в нашем
    компоненте разбивки на страницы, мы возвращаем диапазон [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    /*
    Вычисляем индекс левого и правого родственных элементов, проверяем что они находятся в пределах диапазона 1 и totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
    Мы не показываем точки только тогда, когда между крайними значениями sibling и пределами страницы нужно вставить только один
    номер страницы, т.е. 1 и totalPageCount. Следовательно, мы используем левый sibling индекс > 2 и
    правый sibling индекс < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex <= totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount; 

    const DOTS = '...'

    /*
    Случай 2: Точки слева не отображаются, но точки справа должны отображаться
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = Math.max(currentPage, 2) + siblingCount;
      let leftRange = range(1, leftItemCount);
  
      return [...leftRange, DOTS, totalPageCount];
    } 

    /*
    Случай 3: Правые точки не отображаются, но должны отображаться левые точки
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = Math.max(totalPageCount - currentPage + 1, 2) + siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    } 

    /*
    Случай 4: Должны отображаться как левые, так и правые точки
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    } 
        
    }, [totalCount, pageSize, siblingCount, currentPage, totalPages]);
  
    return paginationRange;
  };