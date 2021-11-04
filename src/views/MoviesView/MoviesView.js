import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Searchbar from '../../components/SearchBar/SearchBar';
import FilmsStatusView from '../FilmStatusView/FilmStatusView';

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();
  const [filmName, setFilmName] = useState('');
  const [films, setFilms] = useState([]);

  const queryURL = new URLSearchParams(location.search).get('query');

  const onQueryChange = query => {
    history.push({ ...location, search: `query=${query}` });
  };

  const onSubmit = name => {
    setFilmName(name);
    setFilms([]);
    onQueryChange(name);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <FilmsStatusView filmName={filmName} queryURL={queryURL} />
    </>
  );
}