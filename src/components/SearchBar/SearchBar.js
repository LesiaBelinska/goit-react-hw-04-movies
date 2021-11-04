import { ImSearch } from 'react-icons/im';
import { useState } from 'react';

import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [filmName, setFilmName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(filmName);
    setFilmName('');
  };

  return (
    <div className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          value={filmName}
          onChange={event =>
            setFilmName(event.currentTarget.value.toLowerCase())
          }
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
        />
        <button type="submit" className={s.searchFormButton}>
          <ImSearch />
        </button>
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

