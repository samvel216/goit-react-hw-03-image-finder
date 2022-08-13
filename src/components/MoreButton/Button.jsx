import styles from './MoreButton.module.css';
import PropTypes from 'prop-types';
export default function Button({ nextPageFunk }) {
  return (
    <button
      type="button"
      onClick={nextPageFunk}
      className={styles.Button}
    >
      Load more
    </button>
  );
}
Button.propTypes = {
  nextPageFunk: PropTypes.func.isRequired,
};
