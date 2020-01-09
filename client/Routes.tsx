import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
// import App from '@/App';
// import Flipper from '@/pages/Flipper';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/flipper">
        {lazy(() =>
          import(/* webpackChunkName: "flipper" */ '@/pages/Flipper')
        )}
      </Route>
      <Route path="/">
        {lazy(() => import(/* webpackChunkName: "main" */ '@/App'))}
      </Route>
    </Switch>
  );
}
