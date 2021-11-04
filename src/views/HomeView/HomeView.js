
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchTrendingMovies, POSTER_URL } from '../../services/themoviedb-api';
import PendingView from '../PendingView/PendingView';
import ErrorView from '../ErrorView/ErrorView';
//import s from './HomeView.module.css';

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function HomeView() {
  const { url } = useRouteMatch();
  const [films, setFilms] = useState([]);
  const [error, setError] = useState({});
  const [status, setStatus] = useState(Status.PENDING);

  useEffect(() => {
    setStatus(Status.PENDING);
    fetchTrendingMovies()
      .then(request => setFilms(request.results))
      .then(setStatus(Status.RESOLVED))
      .catch(err => {
        setError(err);
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.PENDING) {
    return <PendingView />;
 }

  if (status === Status.REJECTED) {
    return <ErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {films && (
          <>
            <p className='{s.title}'>Trending movies</p>
            <ul className='{s.list}'>
              {films.map(film => (
                <>
                  {film.poster_path && (
                    <li key={film.id} className='{s.item}'>
                      <Link to={`${url}movies/${film.id}`} className='{s.link}'>
                        <img
                          className='{s.image}'
                          src={POSTER_URL + film.poster_path}
                          alt={film.title}
                          width="300"
                          height="450"
                        />
                        <p className='{s.filmTitle}'>{film.title}</p>
                      </Link>
                    </li>
                  )}
                </>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}