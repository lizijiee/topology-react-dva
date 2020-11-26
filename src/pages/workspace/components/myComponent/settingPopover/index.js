import React from 'react';
import { connect } from 'dva';
import { Popover, Button } from 'antd';

import styles from './index.less';


class settingPopover extends React.Component{

    constructor(props) {
      super(props);
      this.inputRef = React.createRef();
    }

    componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick=e=>{
      if (!this.inputRef.current||!document.querySelectorAll('.ant-popover-content')[0]) {
      // if (!document.querySelectorAll(this.inputRef.current.tooltip.props.overlayClassName)[0]) {
        return;
      }
      // if (!document.querySelectorAll('.ant-popover-content')[0].contains(e.target) && this.inputRef.current !== e.target) { // 点击自身禁止关闭避免和打开冲突
      if (!document.querySelectorAll('.ant-popover-content')[0].contains(e.target)) {
        this.props.toggleSetting({})
      }
    };

    stopPropa(e){
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      // this.setState(currentState=>({
      //   visible: !currentState.visible
      // }))
    }

    doClose(visible){
      this.setState(currentState=>({
        visible: !currentState.visible
      }))
    }
  render() {
    const { moveDown, i, record, menuList, toggleSetting} = this.props;
    
    return (
      <div >
        <Popover 
          placement="rightTop" 
          overlayClassName={styles.popover}
          ref="targetRef"
          ref={this.inputRef}
          style={{display:'none'}}
          visible={record.show}
          // destroyTooltipOnHide
          content={
            <ul >
              <li
                onClick={(e)=>{
                  moveDown(i);
                  toggleSetting(record)
                }}
              >
                <i className="iconfont icon-arrow-down" />下移
              </li>
              <li 
                 onClick={()=>{
                   console.log("删除项为：",record);        
                  //  toggleSetting({}); // 数据提交成功返回200,关闭popover
                }}
              >
                <i className="iconfont icon-delete" />删除
              </li>
              <li
              >
               <i className="iconfont icon-edit" />编辑
              </li>
            </ul>
          } 
          trigger="click"
        >
          <i className="topology topology-settings" onClick={(e)=>{
            this.stopPropa(e);
            toggleSetting(record);
            }}></i>
        </Popover>
      </div>)
  }
}
export default connect((state) => ({}))(settingPopover);
