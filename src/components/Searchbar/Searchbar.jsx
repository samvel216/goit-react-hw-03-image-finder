import styles from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../images/sprite.svg';
import PropTypes from 'prop-types';
export default function Searchbar({
  value,
  handleChange,
  formSubmit,
}) {
  return (
    <header className={styles.Searchbar}>
      <form
        className={styles.SearchForm}
        onSubmit={formSubmit}
      >
        <button
          type="submit"
          className={styles.SearchFormButton}
        >
          <SearchIcon
            fill="green"
            className={styles.Icon}
          />
          <span className={styles.SearchFormButtonLabel}>
            Search
          </span>
        </button>

        <input
          className={styles.SearchForminput}
          type="text"
          autoComplete="new-password"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
};
