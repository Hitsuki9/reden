import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Flipper.less';

// class Panel {
//   config = {
//     front: 'num0',
//     back: 'num1'
//   };
//   constructor(config: { front: string; back: string }) {
//     Object.assign(this.config, config);
//     this.init();
//   }
//   private init() {
//     this.setFront(this.config.front);
//     this.setBack(this.config.back);
//   }
//   setFront(className: string) {}
//   setBack(className: string) {}
//   flip() {}
// }

/**
 * 翻牌时钟
 */
export default function Flipper() {
  const history = useHistory();

  const renderPanels = (n = 6) => {
    const panels: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      panels.push(
        <Fragment key={i}>
          <div className={classNames(styles.flip, styles.down)}>
            {/* 位于前面的牌 */}
            <div
              className={classNames(styles.digital, styles.front, styles.num0)}
            />
            {/* 位于后面的牌 */}
            <div
              className={classNames(styles.digital, styles.back, styles.num1)}
            />
          </div>
          {i % 2 === 1 && i !== n - 1 && (
            <span className={styles.split}>:</span>
          )}
        </Fragment>
      );
    }
    return panels;
  };

  return (
    <div className="flex-center" style={{ height: '100vh' }}>
      <button type="button" onClick={() => history.push('/')}>
        home
      </button>
      <div className={styles.clock}>{renderPanels()}</div>
    </div>
  );
}
