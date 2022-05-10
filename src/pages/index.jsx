import React, { useRef, useState } from "react";
import styles from "./index.less";
import { useModel } from "umi";
import { InfiniteScroll, List, SearchBar } from "antd-mobile";
import { FilterOutline } from "antd-mobile-icons";
import { mockRequest } from "./mock";
import { useRequest } from "ahooks";

const Tower = () => {
  const dom = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [data, setData] = useState([]);
  const { initialState } = useModel("@@initialState");
  const [refresh, setRefresh] = useState(true);
  const [hasMore, setHasMore] = useState(false); //  改成true
  const a = useRequest(mockRequest, { manual: true });
  let page = 0;

  const onChange = (value) => {
    page = 0;
  };

  const handleRefsh = () => {
    page = 0;
    setRefresh((x) => !x);
    setVisible(false);
  };

  const loadMore = async () => {
    ++page;
    let result = [];
    result = await a.run();
    console.log(result);
    setData(x => {
      if (page == 1) {
        return result;
      } else {
        return [...x, ...result];
      }
    });
    setHasMore(result.length > 0);
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
