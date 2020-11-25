import React from 'react';
import { connect } from 'dva';
import { Popover, Button } from 'antd';

import styles from './index.less';


class settingPopover extends React.Component{

    componentDidMount() {

    }
    
  render() {
    const { moveDown,id}= this.props
    return (
      <>
        <Popover 
          placement="rightTop" 
          overlayClassName={styles.popover}
          content={
            <ul>
              <li><i className="iconfont icon-arrow-down" onClick={()=>{moveDown(id)}}/>下移</li>
              <li><i className="iconfont icon-delete" />删除</li>
              <li><i className="iconfont icon-edit" />编辑</li>
            </ul>
          } 
          trigger="click"
        >
          <i className="topology topology-settings"></i>
        </Popover>
      </>)
  }
}
export default connect((state) => ({}))(settingPopover);
