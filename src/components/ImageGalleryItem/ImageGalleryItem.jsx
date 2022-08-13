import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  onClick,
}) {
  return (
    <li
      key={id}
      className={styles.ImageGalleryItem}
      id={id}
    >
      <a href={largeImageURL} onClick={onClick}>
        <img
          src={webformatURL}
          alt=""
          className={styles.ImageGalleryItemImage}
        />
      </a>
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
