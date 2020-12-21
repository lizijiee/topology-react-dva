import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import { Avatar, Pagination,Button } from 'antd';

import { list } from '../services/topology';
import styles from './index.less';

class Index extends React.Component {

  state = {
    data: {
      list: [],
      count: 0
    },
    search: {
      pageIndex: 1,
      pageCount: 8
    }
  };

  componentDidMount() {
    this.getList();
  }

  async getList(page) {
    const data = await list(page || this.state.search.pageIndex, this.state.search.pageCount);
    this.setState({
      data
    });
  }

  handlePage = (page) => {
    this.setState({
      search: {
        pageIndex: page,
        pageCount: 8
      }
    });

    this.getList(page);
  }

  open(data) {
    router.push({
      pathname: '/workspace',
      query: {
        id: data.id,
      },
    });
  }

  render() {
    return (
      <div className={styles.page}>
        <div className={styles.nav}>
          <Button onClick={() => {router.push('/workspace')}}>新建组态</Button>
        </div>
        <div className="flex wrap">
          {this.state.data.list.map((item, index) => {
            return (
              <div className={styles.topo} key={index} >
                <div className={styles.image}>
                  <img src={item.image} onClick={() => { this.open(item) }}/>
                </div>
                <div className="ph15 pv10">
                  <div className={styles.title} title={item.name}>
                    <span>{item.name}</span>
                    <Button size={'small'}>删除</Button>
                  </div>
                  <div className={styles.desc} title={item.desc}>{item.desc}</div>
                  <div className="flex mt5">
                    <div className="full flex middle">
                      <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="small">
                        {item.username[0]}
                      </Avatar>
                      <span className="ml5">{item.username}</span>
                    </div>
                    {/* <div>
                      <span className="hover pointer mr15" title="赞">
                        <i className={item.stared ? 'iconfont icon-appreciatefill' : 'iconfont icon-appreciate'} />
                        <span className="ml5">{item.star || 0}</span>
                      </span>
                      <span className="hover pointer" title="收藏">
                        <i className={item.favorited ? 'iconfont icon-likefill' : 'iconfont icon-like'} />
                        <span className="ml5">{item.hot || 0}</span>
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div>
          <Pagination defaultPageSize={8} current={this.state.search.pageIndex} total={this.state.data.count} onChange={this.handlePage} />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ event: state.event }))(Index);
