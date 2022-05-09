import React, { useEffect } from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { useModel, history } from 'umi';
import styles from './index.less';

const CommonLayout = ({ children, location, route, ...rest }) => {
  const {
    initialState: { navBar, tabBar },
  } = useModel('@@initialState');

  const onBack = () => {
    history.go(-1);
  };
  return (
    <div className={styles.app}>
      <div className={styles.top} style={{ height: 46 }}>
        {(() => {
          if (navBar) {
            //  navBar如果不设置 用默认的
            return <NavBar onBack={onBack}>{route.title}</NavBar>;
            if (navBar && Object.keys(navBar).length) {
              // 自定义设置
              return (
                <NavBar {...navBar}>{navBar.title ? navBar.title : ''}</NavBar>
              );
            }
          } else {
            // navBar == false 不显示
            return '';
          }
        })()}
      </div>
      <div
        className={styles.body}
        style={{ margin: `46px 0 ${tabBar.length ? '50px' : 0} 0` }}
      >
        {children}
      </div>
      {tabBar.length ? (
        <div className={styles.bottom} style={{ height: 50 }}>
          <TabBar>
            {tabBar.map((item) => (
              <TabBar.Item key={item.key} title={item.title} />
            ))}
          </TabBar>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CommonLayout;
