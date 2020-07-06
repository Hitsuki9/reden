import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '@/store/reducer';
import useLogin from '@/hooks/useLogin';
import useUserInfo from '@/hooks/useUserInfo';
import Search from './Search';
import Card from './Card';
import style from './Linkman.less';

const focusStyle = {
  background: 'var(--primary-color-3)'
};

export default function Linkman() {
  const isLogin = useLogin();
  const hasUserInfo = useUserInfo();
  const linkmans = useSelector((state: State) => state.linkmans);
  const focus = useSelector((state: State) => state.focus);

  return (
    <div className={style.linkman}>
      {isLogin && <Search />}
      {hasUserInfo && (
        <div>
          {Object.values(linkmans).map((item) => (
            <Card
              extraStyle={item._id === focus ? focusStyle : void 0}
              key={item._id}
              name={item.name}
              avatar={item.avatar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
