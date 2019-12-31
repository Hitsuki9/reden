import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '@/App';
import Flipper from '@/pages/Flipper';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/flipper">
        <Flipper />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  );
}
