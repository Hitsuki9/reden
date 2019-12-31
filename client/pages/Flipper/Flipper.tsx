import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Flipper() {
  const history = useHistory();

  return (
    <div>
      <button type="button" onClick={() => history.push('/')}>
        home
      </button>
      Flipper
    </div>
  );
}
