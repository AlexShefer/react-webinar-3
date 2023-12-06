import PropTypes from 'prop-types';
import './style.css';

/**
 * Компонент: Skeleton
 * Описание: Компонент-заглушка для отображения временного эффекта загрузки. Создает указанное количество прямоугольных блоков с мерцающим эффектом.
 * @param {Object} props - Свойства компонента.
 * @param {number} props.times - Количество блоков в компоненте.
 * @param {string} props.width - Ширина блоков. Может быть задана в формате CSS, например, "100px" или "50%".
 * @param {string} props.height - Высота блоков. Может быть задана в формате CSS, например, "100px" или "50%".
 * @returns {JSX.Element} - Возвращает JSX элемент, содержащий указанное количество прямоугольных блоков с мерцающим эффектом.
 */
function Skeleton({ times, width, height }) {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div
          key={i}
          className="Skeleton-box" 
          style={{
            width: `${width || ""}`,
            height: `${height || ""}`,
          }}
        >
          <div className='Skeleton-shimmer'></div>
        </div>
          );
    });

    return <div className='Skeleton-container'>{boxes}</div>;
}

Skeleton.propTypes = {
  times: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};


export default Skeleton;
