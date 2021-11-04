import { Link, useRouteMatch } from 'react-router-dom';
import { POSTER_URL } from '../../services/themoviedb-api';
//import s from './GalleryView.module.css';

export default function GalleryView({ films }) {
  const { url } = useRouteMatch();

  return (
    <ul className='{s.list}'>
      {films.map(film => (
        <>
          {film.poster_path && (
            <li key={film.id} className='{s.item}'>
              <Link to={`${url}/${film.id}`} className='{s.link}'>
                <img
                  className='{s.image}'
                  src={POSTER_URL + film.poster_path}
                  alt={film.title}
                  width="300"
                  height="450"
                />
                <p className='{s.title}'>{film.title}</p>
              </Link>
            </li>
          )}
        </>
      ))}
    </ul>
  );
}

