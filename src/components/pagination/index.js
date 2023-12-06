import {memo, useMemo} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { usePagination } from "../use-pagination";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props){
  const {
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
    totalPages
  } = props;

  const cn = bem('Pagination');


  /* 
  TODO: Необходимо рассмотреть 4 случая рендеринга пагинатора:
  Случай 1:
  Если количество страниц меньше, чем номера страниц, которые мы хотим отобразить в нашем
  компоненте разбивки на страницы, мы возвращаем диапазон [1..totalPageCount]
  Случай 2: Точки слева не отображаются, но точки справа должны отображаться
  Случай 3: Правые точки не отображаются, но должны отображаться левые точки
  Случай 4: Должны отображаться как левые, так и правые точки
  */

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPages
  });


  return(
    <div className={cn()}>
      {paginationRange.map((el, index) => {
        if (el === '...'){
          return <div key={index} className={cn('dots')}>...</div>
        } else {
          
          return (
            <div 
              key={index}
              className={cn('item' + (el === currentPage ? '_active' : ''))}>
              <Link
                to={`/catalog/${el}`} 
                className={cn('link')}
                onClick={()=>callback.handleClick(el)}
              >
                {el}
              </Link>
            </div>
          )
        }
      })}
      
    </div>
  )
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default memo(Pagination)
