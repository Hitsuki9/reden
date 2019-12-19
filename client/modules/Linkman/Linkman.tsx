import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Linkman.less';
import useLogin from '@/hooks/useLogin';
import Search from '@/components/Search';
import Card from '@/components/Card';
import { State } from '@/store/reducer';

export default function Linkman() {
  const isLogin = useLogin();
  const hasUserInfo = useSelector((state: State) => !!state.user);
  const linkmans = useSelector((state: State) => state.linkmans);

  return (
    <div className={styles.linkman}>
      {isLogin && <Search />}
      {hasUserInfo && (
        <div>
          {Object.values(linkmans).map((item) => (
            <Card key={item.id} name={item.name} avatar={item.avatar} />
          ))}
        </div>
      )}
    </div>
  );
}
