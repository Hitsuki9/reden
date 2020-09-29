import React, { lazy, Suspense, LazyExoticComponent } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import Loading from '@/components/Icons/Loading';
import CommonClass from '@style/constant';

const App = lazy(() => import(/* webpackChunkName: "main" */ '@/App'));
const routes: [string, LazyExoticComponent<() => JSX.Element>][] = [
  [
    'flipper',
    lazy(() => import(/* webpackChunkName: "flipper" */ '@/pages/Flipper'))
  ],
  [
    'burst',
    lazy(() => import(/* webpackChunkName: "burst" */ '@/pages/Burst'))
  ],
  [
    'cropper',
    lazy(() => import(/* webpackChunkName: "cropper" */ '@/pages/Cropper'))
  ],
  [
    'uploader',
    lazy(() => import(/* webpackChunkName: "uploader" */ '@/pages/Uploader'))
  ],
  [
    'awesome-css',
    lazy(() =>
      import(/* webpackChunkName: "awesome-css" */ '@/pages/AwesomeCSS')
    )
  ]
];

const loading = (
  <div style={{ height: '100vh' }} className={CommonClass.FlexCenter}>
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
            <div
              style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Button
                style={{ alignSelf: 'flex-start' }}
                type="primary"
                onClick={() => history.push('/')}
              >
                Home
              </Button>
              <div className={CommonClass.FlexCenter} style={{ flexGrow: 1 }}>
                <Suspense fallback={Loading()}>
                  <RouteChild />
                </Suspense>
              </div>
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
