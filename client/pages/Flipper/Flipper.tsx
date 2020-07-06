import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';
import { formatDate } from '@/utils';
import style from './Flipper.less';

const panelNums = 6; // 牌数
const flipDuration = 500; // 翻牌动画持续时间

/**
 * diff 当前时间与下一秒时间 返回对应的牌是否需要翻的状态
 * @param curTime 当前时间
 * @param nextTime 下一秒时间
 */
function diffNums(curTime: string, nextTime: string) {
  const res = [];
  for (let i = 0; i < curTime.length; i++) {
    if (curTime[i] === nextTime[i]) {
      res.push(false);
    } else {
      res.push(true);
    }
  }
  return res;
}

/**
 * 翻牌时钟
 */
export default function Flipper() {
  const [state, setState] = useState({
    time: new Date(), // 当前时间
    panelsState: new Array(panelNums).fill(false) // 翻牌状态
  });
  let timer: number;
  const curTime = formatDate(state.time, 'HHmmss');
  const nextTime = formatDate(new Date(state.time.getTime() + 1000), 'HHmmss');
  const updateTime = () => {
    const newTime = new Date();
    if (formatDate(newTime, 'HHmmss') === curTime) {
      timer = requestAnimationFrame(updateTime);
    } else if (newTime.getMilliseconds() >= flipDuration) {
      // 根据翻牌动画的持续时间，在整秒后延迟相应的时间才更新牌内容
      setState({
        time: newTime,
        panelsState: new Array(panelNums).fill(false)
      });
    } else if (newTime.getMilliseconds() >= 0) {
      // 在整秒时触发翻牌动画
      setState({
        ...state,
        panelsState: diffNums(curTime, nextTime)
      });
    }
  };
  useEffect(() => {
    timer = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(timer);
  });

  const renderPanels = (n = panelNums) => {
    const panels: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      panels.push(
        <Fragment key={i}>
          <div
            className={classNames(
              style.flip,
              style.down,
              state.panelsState[i] ? style.start : void 0
            )}
          >
            {/* 位于前面的牌 */}
            <div
              className={classNames(
                style.digital,
                style.front,
                style[`num${curTime[i]}`]
              )}
            />
            {/* 位于后面的牌 */}
            <div
              className={classNames(
                style.digital,
                style.back,
                style[`num${nextTime[i]}`]
              )}
            />
          </div>
          {i % 2 === 1 && i !== n - 1 && (
            <span className={style.split}>:</span>
          )}
        </Fragment>
      );
    }
    return panels;
  };

  return <div className={style.clock}>{renderPanels()}</div>;
}
