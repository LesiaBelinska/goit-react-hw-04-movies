import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieCast, POSTER_URL } from '../../services/themoviedb-api';
//import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(request => setCast(request.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <>
          <ul className='{s.list}'>
            {cast.map(item => (
              <li key={item.id} className='{s.item}'>
                    <img
                      className='{s.image}'
                      src={POSTER_URL + item.profile_path}
                      alt={item.name}
                      widht="100"
                      height="150"
                    />
                    <p> {item.name}</p>
                  </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};