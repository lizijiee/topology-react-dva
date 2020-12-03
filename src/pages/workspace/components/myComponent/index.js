import React from 'react';
import { connect } from 'dva';
import { Popover, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import styles from './index.less';
import FlipMove from 'react-flip-move';
import SettingPopover from './settingPopover';
import ChangeInput from './ChangeInput';

class myComponent extends React.Component{
  state = {
    ModalText: 'Content of the modal',    //
    visible: false,
    confirmLoading: false,
    items:[
        {id:1,name:'组件类别一'},
        {id:2,name:'组件类别二'},
        {id:3,name:'组件类别三'},
    ],
    show: 0,                    // 列表气泡卡片索引
    showPopover: false,         // 气泡卡片显示隐藏
    index: 0,                   // 列表输入框索引
    showInput: false,           // 输入框显示隐藏
    isModalVisible: false       // 编辑组件显示隐藏
  };
  componentDidMount() {
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  submitOk =async () => {
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
    this.props.form.validateFields((err,values) => {
      if (!err) {
        this.submitOk();
        console.info('success', values);// values= { username: "12312312" }
      }
    });
  };
  moveDown=(index) => {
    this.resort(index,1);
  }
  resort(index,diff){
    let items = this.state.items;
    let item = items[index];
    items.splice(index,1);
    items.splice(index + diff,0,item);
    this.setState({items:items});
  }
  // componentWillReceiveProps(nextProps){
  //   console.log('nextProps',nextProps)
  // }
  componentDidUpdate(prevProps) {
    // if (prevProps.yourModels !== this.props.yourModels) {
    //   this.setState({
    //       data: this.props.yourModels.data
    //   })
    // }
  }
  hidePopover = () => {
    this.setState({
      showPopover: false,
      show: 0
    });
  };
  showPopover = (showPopover,show) => {
    if(showPopover){
      this.setState({ showPopover,show:show });
    }else{
      this.setState({ showPopover,show:0});
    }
  };
  handleOk = (value) => {
    this.setState((prevState)=>({items:prevState.items.map((e)=>e.id===value.id?value:e)}))
    console.log('编辑组件库完成',value); //{type: "4543543543"} 修改完成值
  }
  //点击展示输入框
  handleChangeClick = () => {
    this.setState({
        showInput:true
    })
  };
  //点击关闭输入框
  handleCloseClick = () => {
    this.setState({
        showInput:!this.state.showInput
    })
  };
  hideInput = () => {
    this.setState({
      showInput: false,
      index: 0
    });
  };
  showInput = (showInput,index) => {
    if(showInput){
      this.setState({ showInput,index:index });
    }else{
      this.setState({ showInput,index:0});
    }
  };
  confirm(e) {
    console.log(e);
    message.success('删除当前组件');
  }
  cancel(e) {
    console.log(e);
    message.error('取消删除当前组件');
  }
  showEditComponnetModal = () => {
    this.setState({
      isModalVisible: true,
    });
  }
  closeEditComponnetModal = () => {
    this.setState({
      isModalVisible: false,
    });
  }
  render() {
      const { visible, confirmLoading, ModalText, items } = this.state;
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    return (
      <>
      <div className={styles.tools}>
        <FlipMove>
            {
              items.map((e,i) => {
                return (
                  <div key={e.id}>
                    <div className={styles.group}>
                      <i className="iconfont icon-cube"></i>
                      {/* <span className={styles.full}>{e.name}</span> */}
                      <ChangeInput
                        fontSize='12px'            //显示字体大小
                        iconColor="#5f68ea"        //鼠标滑过icon图标颜色
                        inputWidth="1rem"         //输入框宽度，高度自适应
                        showSize="30"              //可展示字数，溢出隐藏，滑过展示全部
                        amount="30"                //字数限制长度
                        type="number"              //可输入类型
                        handleOk={this.handleOk}   //点击对号回调
                        value={e.name}             //传入内容
                        name="name"             //回显数据键名
                        required={true}         // 是否进行验证
                        idName='id'             // 添加键名为idName值
                        id={e.id}               // 设置id键值
                        record={e}
                        state={this.state}
                        showInput={this.showInput}
                        hideInput={this.hideInput}
                      />
                      <SettingPopover
                        moveDown={this.moveDown}
                        i={i}
                        record={e}
                        items={items}
                        hidePopover={this.hidePopover}
                        showPopover={this.showPopover}
                        state={this.state}
                        showInput={this.showInput}
                      />
                    </div>
                    <div className={styles.buttons}>
                      <div className={styles.wrapper}>
                      <Popconfirm
                        title="是否确认删除？"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="确定"
                        cancelText="取消"
                      >
                        <i className={["iconfont icon-close",styles.close].join(' ')}/>
                      </Popconfirm>

                        <img draggable="true" title="新组件" src={require("./image/thumb.png")} />
                      </div>
                      <span
                        title="我来添加组件"
                        draggable="true"
                        className={styles.add}
                        onClick={this.showEditComponnetModal}
                      >
                        <i className="iconfont icon-add"></i>
                      </span>
                      <Modal
                        title="请选择对组件操作"
                        visible={this.state.isModalVisible}
                        // onOk={handleOk}
                        onCancel={this.closeEditComponnetModal}
                      >
                        <p>上传组件图片</p>
                        <p>绘制组件</p>
                      </Modal>
                    </div>
                  </div>
                )
              })
            }
        </FlipMove>
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
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '名称输入不能为空',
              },
            ],
          })(<Input placeholder="请输入组件库名称" />)}
        </Form.Item>
      </Modal>
      </>
    );
  }
}

const WrappedmyComponent = Form.create({ name: 'dynamic_rule' })(myComponent);

// export default connect((state) => ({event: state.event}))(myComponent);
export default connect((state) => ({}))(WrappedmyComponent);
