import React from 'react';
import style from './TripLoading.less';

function renderList() {
  const list = [];
  for (let i = 0; i < 6; i++) {
    list.push(<li key={i} />);
  }
  return list;
}

export default function TripLoading() {
  return (
    <ul className={style.tripLoading}>
      {renderList()}
    </ul>
  );
}
