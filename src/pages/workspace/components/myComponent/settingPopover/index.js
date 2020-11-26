import React from 'react';
import { connect } from 'dva';
import { Popover, Button } from 'antd';

import styles from './index.less';


class settingPopover extends React.Component{

    constructor(props) {
      super(props);
      this.inputRef = React.createRef();
    }

    state={
      visible:false
    }
    componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick);
    }
    
    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick=e=>{
      if (!this.inputRef.current) {
      // if (!document.querySelectorAll(this.inputRef.current.tooltip.props.overlayClassName)[0]) {
        return;
      }
      // if (!document.querySelectorAll('.ant-popover-content')[0].contains(e.target) && this.inputRef.current !== e.target) { // 点击自身禁止关闭避免和打开冲突
      if (!document.querySelectorAll('.ant-popover-content')[0].contains(e.target)) {
        this.setState({
          visible: false,
        });
      }
    };

    doShow(e){
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      this.setState({visible:true})
    }

    doClose(visible){
      this.setState(currentState=>({
        visible: !currentState.visible
      }))
    }
  render() {
    const { moveDown, i, record} = this.props;
    const {visible} = this.state;
    
    return (
      <div >
        <Popover 
          placement="rightTop" 
          overlayClassName={styles.popover}
          ref="targetRef"
          ref={this.inputRef}
          style={{display:'none'}}
          visible={visible}
          // destroyTooltipOnHide
          content={
            <ul 
              onClick={(e)=>{
                moveDown(i);
                this.doClose(visible);
              }}
            >
              <li>
                <i className="iconfont icon-arrow-down" />下移
              </li>
              <li 
                 onClick={()=>{
                   console.log("删除项为：",record);
                  //  this.setState({visible:!visible})
                  // moveDown(i);
                  // this.close(visible);
                }}
              >
                <i className="iconfont icon-delete" />删除
              </li>
              <li><i className="iconfont icon-edit" />编辑</li>
            </ul>
          } 
          trigger="click"
        >
          <i className="topology topology-settings" onClick={(e)=>{this.doShow(e)}}></i>
        </Popover>
      </div>)
  }
}
export default connect((state) => ({}))(settingPopover);
