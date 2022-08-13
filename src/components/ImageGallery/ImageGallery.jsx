import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({
  gallery,
  handleClick,
}) {
  const item = gallery.map(
    ({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        id={id}
        onClick={handleClick}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
      />
    )
  );
  return <ul className={styles.ImageGallery}>{item}</ul>;
}
ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};
