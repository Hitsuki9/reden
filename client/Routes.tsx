import React, { lazy, Suspense, LazyExoticComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from '@/components/Icons/Loading';

const App = lazy(() => import(/* webpackChunkName: "main" */ '@/App'));
const routes: [string, LazyExoticComponent<() => JSX.Element>][] = [
  [
    'flipper',
    lazy(() => import(/* webpackChunkName: "flipper" */ '@/pages/Flipper'))
  ],
  ['burst', lazy(() => import(/* webpackChunkName: "burst" */ '@/pages/Burst'))]
];

const loading = (
  <div style={{ height: '100vh' }} className="flex-center">
    <Loading />
  </div>
);

export default function Routes() {
  return (
    <Switch>
      {routes.map((route) => {
        const [path, RouteChild] = route;
        return (
          <Route key={path} exact path={`/${path}`}>
            <Suspense fallback={loading}>
              <RouteChild />
            </Suspense>
          </Route>
        );
      })}
      <Route path="/">
        <Suspense fallback={loading}>
          <App />
        </Suspense>
      </Route>
    </Switch>
  );
}
