import React from 'react';
import { connect } from 'dva';
import { Popover, Button, Modal, Form, Input } from 'antd';
import styles from './index.less';
import SettingPopover from './settingPopover';

class myComponent extends React.Component{
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  componentDidMount() {
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  
  handleOk =async () => {
    // 提交数据
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    // await 等待数据返回关闭弹框关闭Loading
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  check = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.handleOk()
        console.info('success');
      }
    });
  };
  render() {
      const { visible, confirmLoading, ModalText } = this.state;    
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    return (
      <>
      <div className={styles.tools}>
        <div>
          <div className={styles.group}>
            <i className="iconfont icon-cube"></i>
            <span className={styles.full}>组件类别一</span>
            <SettingPopover  className={styles.className}/>
          </div>
          <div className={styles.buttons}>
            <img draggable="true" title="新组件" src={require("./image/thumb.png")} />
            <span title="我来添加组件" draggable="true" className={styles.add}>
              <i  className="iconfont icon-add"></i>
            </span>
          </div>
        </div>
        <div>
          <div className={styles.group}>
            <i className="iconfont icon-cube"></i>
            <span className={styles.full}>组件类别二</span>
            <SettingPopover  className={styles.className}/>
          </div>
          <div className={styles.buttons}>
            <img draggable="true" title="新组件" src={require("./image/thumb.png")} />
            <span title="我来添加组件" draggable="true" className="add">
              <i  className="iconfont icon-add"></i>
            </span>
          </div>
        </div>
        <div>
          <div className={styles.group}>
            <i className="iconfont icon-cube"></i>
            <span className={styles.full}>组件类别三</span>
            <SettingPopover  className={styles.className}/>
          </div>
          <div className={styles.buttons}>
            <img draggable="true" title="新组件" src={require("./image/thumb.png")} />
            <span title="我来添加组件" draggable="true" className="add">
              <i  className="iconfont icon-add"></i>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.setting}>
        <button 
          className={styles.button} 
          onClick={this.showModal}
        > + 添加组件库</button>
      </div>
      <Modal
        title="添加"
        mask={false}
        okText="确定"
        cancelText="取消"
        bodyStyle={{padding: "15px 24px 10px 24px"}}
        destroyOnClose={true}
        className={styles.modal} 
        visible={visible}
        onOk={this.check}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >
        {/* <p>{ModalText}</p> */}
        <Form.Item {...formItemLayout} label="名称">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '名称输入不能为空',
              },
            ],
          })(<Input placeholder="请输入名称" />)}
        </Form.Item>
      </Modal>
      </>
    );
  }
}

const WrappedmyComponent = Form.create({ name: 'dynamic_rule' })(myComponent);

// export default connect((state) => ({event: state.event}))(myComponent);
export default connect((state) => ({}))(WrappedmyComponent);
