import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Flipper.less';

class Panel {
  config = {
    front: 'num0',
    back: 'num1'
  };
  constructor() {}
  init() {}
  setFront(className: string) {}
  setBack(className: string) {}
  flip() {}
}

/**
 * 翻牌时钟
 */
export default function Flipper() {
  const history = useHistory();

  return (
    <div>
      <button type="button" onClick={() => history.push('/')}>
        home
      </button>
      <div className={classNames(styles.flip, styles.down)}>
        {/* 位于前面的牌 */}
        <div
          className={classNames(styles.digital, styles.front, styles.num0)}
        />
        {/* 位于后面的牌 */}
        <div className={classNames(styles.digital, styles.back, styles.num1)} />
      </div>
    </div>
  );
}
