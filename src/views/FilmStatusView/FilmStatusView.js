import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMoviesByName } from '../../services/themoviedb-api';
import ErrorView from '../ErrorView/ErrorView';
import PendingView from '../PendingView/PendingView';
import GalleryView from '../GalleryView/GalleryView';
//import s from './FilmStatusView.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function FilmsStatusView({ filmName, queryURL }) {
  const [error, setError] = useState({});
  const [status, setStatus] = useState(Status.IDLE);
  const [films, setFilms] = useState([]);

  const fetchFilms = name => {
    fetchMoviesByName(name)
      .then(newFilms => {
        if (newFilms.total_results > 0) {
          setFilms(newFilms.results);
          setStatus(Status.RESOLVED);
        } else return Promise.reject(new Error('Invalid request'));
      })
      .catch(err => {
        setError(err);
        setStatus(Status.REJECTED);
      });
  };

  useEffect(() => {
    if (filmName === '' && queryURL !== null) {
      fetchFilms(queryURL);
      return;
    }
    if (filmName) {
      fetchFilms(filmName);
    }
  }, [filmName, queryURL]);

  if (status === Status.IDLE) {
    return <p className='{s.message}'>Please enter your search term</p>;
  }

  if (status === Status.PENDING) {
    return <PendingView />;
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <GalleryView films={films} />
      </>
    );
  }
}

FilmsStatusView.propTypes = {
  filmName: PropTypes.string.isRequired,
  queryURL: PropTypes.string,
};
