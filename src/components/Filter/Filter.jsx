import PropTypes from 'prop-types';
import css from '../Filter/Filter.module.css';

export const Filter = ({ filter, onChangeInput }) => {
  return (
    <div className={css.filter_container}>
      <label className={css.filter_label}>Find contacts by name </label>
      <input
        type="text"
        name="filter"
        value={filter} // wartość początkową
        onChange={onChangeInput}
        className={css.filter_input}
        placeholder="Enter contact"
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
