import React from 'react';
import { connect } from 'dva';
import { Popover, Button } from 'antd';

import styles from './index.less';


class settingPopover extends React.Component{

    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

  render() {
    const { moveDown, i, record, items, hidePopover, showPopover, state, showInput} = this.props;
    return (
      <div >
        <Popover
          placement="rightTop"
          overlayClassName={styles.popover}
          visible={state.show === record.id && state.showPopover} // 修改变成record.id
          onVisibleChange={(e)=>showPopover(e,record.id)}
          // destroyTooltipOnHide
          content={
            <ul >
              <li onClick={(e)=>{ moveDown(i);hidePopover(); }}>
                <i className="iconfont icon-arrow-down" />下移
              </li>
              <li onClick={()=>{console.log("删除项为：",record);  /*  hidePopover(); 数据提交成功返回200,调用hidePopover  */     }}>
                <i className="iconfont icon-delete" />删除
              </li>
              <li onClick={(e)=>{
                hidePopover();
                showInput(e,record.id);
              }}>
               <i className="iconfont icon-edit" />编辑
              </li>
            </ul>
          }
          trigger="click"
        >
          <i className="topology topology-settings"></i>
        </Popover>
      </div>)
  }
}
export default connect((state) => ({}))(settingPopover);
