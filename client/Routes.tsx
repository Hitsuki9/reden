import React, { lazy, Suspense, LazyExoticComponent } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Button } from 'antd';
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
  const history = useHistory();

  return (
    <Switch>
      {routes.map((route) => {
        const [path, RouteChild] = route;
        return (
          <Route key={path} exact path={`/${path}`}>
            <div className="flex-center" style={{ height: '100vh' }}>
              <Button type="primary" onClick={() => history.push('/')}>
                Home
              </Button>
              <Suspense fallback={Loading()}>
                <RouteChild />
              </Suspense>
            </div>
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
