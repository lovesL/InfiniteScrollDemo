import React, { useRef, useState } from 'react';
import styles from './index.less';
import { useModel } from 'umi';
import { InfiniteScroll, List, SearchBar } from 'antd-mobile';
import { FilterOutline } from 'antd-mobile-icons';

const Tower = () => {
  const dom = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [data, setData] = useState([]);
  const { initialState } = useModel('@@initialState');
  const [value, setValue] = useState('tower');
  const [result, setResult] = useState([]);
  const [packages, setPackages] = useState([]);
  const [current, setCurrent] = useState([]);
  const [input, setInput] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  let page = 0;

  const onChange = (value) => {
    page = 0;
    setInput(value);
  };

  const handleRefsh = () => {
    page = 0;
    setRefresh((x) => !x);
    setVisible(false);
  };

  const loadMore = async () => {
    ++page;
    console.log(page);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.search_box}>
        <SearchBar
          placeholder="请输入内容"
          onSearch={onChange}
          onChange={onChange}
          style={{ width: '100%' }}
        />
        <FilterOutline className={styles.filter_icon} />
      </div>
      <div className={styles.wrapper}>
        <List>
          {data.map((item, index) => (
            <List.Item key={index} className={styles.list_box}>
              1111
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
};

export default Tower;
