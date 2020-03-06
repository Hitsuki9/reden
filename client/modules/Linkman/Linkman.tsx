import React from 'react';
import { useSelector } from 'react-redux';
import useLogin from '@/hooks/useLogin';
import Search from '@/components/Search';
import Card from '@/components/Card';
import { State } from '@/store/reducer';
import styles from './Linkman.less';

const focusStyle = {
  background: 'var(--primary-color-3)'
};

export default function Linkman() {
  const isLogin = useLogin();
  const hasUserInfo = useSelector((state: State) => !!state.user);
  const linkmans = useSelector((state: State) => state.linkmans);
  const focus = useSelector((state: State) => state.focus);

  return (
    <div className={styles.linkman}>
      {isLogin && <Search />}
      {hasUserInfo && (
        <div>
          {Object.values(linkmans).map((item) => (
            <Card
              extraStyle={item._id === focus ? focusStyle : undefined}
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
