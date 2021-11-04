import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import PendingView from './views/PendingView/PendingView';

const HomeView = lazy(() => import('./views/HomeView/HomeView' /* webpackChunkName:"HomeView"*/),);
const MoviesView = lazy(() => import('./views/MoviesView/MoviesView' /* webpackChunkName:"MoviesView"*/),);
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView/MovieDetailsView' /* webpackChunkName:"ovieDetailsView"*/),);
const NotFoundView = lazy(() => import('./views/NotFoundView/NotFoundView' /* webpackChunkName:"NotFoundView"*/),);


function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<PendingView/>}>
        <Switch>
        <Route path='/' exact>
        <HomeView/>
        </Route>
        <Route path='/movies' exact>
          <MoviesView/>
        </Route>
        <Route path='/movies/:movieId'>
          <MovieDetailsView/>
          </Route>
          <Route>
            <NotFoundView/>
          </Route>
      </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
