import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Popover, Button, Modal, Form, Input, Popconfirm, message } from 'antd';
import styles from './index.less';
import FlipMove from 'react-flip-move';
import SettingPopover from './settingPopover';
import ChangeInput from './changeInput';
import {get, Upload} from './service';

class myComponent extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        show: 0,                    // 列表气泡卡片索引
        showPopover: false,         // 气泡卡片显示隐藏
        index: 0,                   // 列表输入框索引
        showInput: false,           // 输入框显示隐藏
        isModalVisible: false,      // 编辑组件显示隐藏
        record:{},                  // 当前编辑组件类型
      };
    }
  componentDidMount() {
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  submitOk =async (values) => {
    const { typeList } = this.props.type;
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });

      let items=[...typeList,{ id: typeList.length+1, name:values.type, images:[] }];
      this.props.dispatch({
        type: 'type/update',
        payload: {
          typeList: items
        }
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
        this.submitOk(values);
      }
    });
  };

  moveDown=(index) => {
    this.resort(index,1);
  }
  resort(index,diff){
    let items = this.props.type.typeList;
    let item = items[index];
    items.splice(index,1);
    items.splice(index + diff,0,item);
    this.setState({items});
  }

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
    this.props.dispatch({
      type: 'type/update',
      payload: {
        typeList: this.props.type.typeList.map(e=>e.id===value.id?{...e,name:value.name,images:e.images?e.images:[]}:e)
      }
    });
    console.log('编辑组件库完成',value);
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
    message.success('删除成功');
  }
  cancel(e) {
    console.log(e);
    message.error('取消操作');
  }
  showEditComponentModal = (record) => {
    this.setState({
      isModalVisible: true,
      record
    });
  }
  closeEditComponentModal = () => {
    this.setState({
      isModalVisible: false,
    });
  }
  createComponent(){
    this.props.onEditTool(this.state.record.name);
    // router.push({
    //   pathname: '/workspace',
    //   query: {
    //     c: true,
    //     class:this.state.record.name
    //   },
    // });
    // this.props.dispatch({type:'class/saveClassInfo',payload:{class:this.state.record.name}})

    this.setState({isModalVisible:false})
  }
  onImageUpload=(type)=> {
    this.setState({isModalVisible:false})
    const input = document.createElement('input');
    input.type = 'file';
    input.accept='image/png,image/gif,image/jpeg';
    input.multiple="multiple"
    input.onchange = async event => {
      const elem = event.target;
      // Upload(elem.files[0], elem.files[0].name);
      this.getBase64(elem.files,type);
    };
    input.click();
  }
  /**
   * @description: 上传图片转化为Base64
   * @param {files} async 上传图片文件列表
   * @param {type} 组件类别
   * @return {*}
   */
  getBase64=async (files,type)=>{
    let uploadList =[];
    const readFileAsync = file => new Promise(resolve=>{
      const reader = new FileReader();   // 新建FileReader对象
      reader.onload = (e)=> resolve(e.target.result);
      reader.readAsDataURL(file)   // 将读取的文件转换成base64格式
    })
    for(let i=0;i<files.length;i++){
      if (!/image\/\w+/.test(files[i].type)) {
        message.error('请确保文件为图像类型');
    　　return false;
 　　 }
      uploadList.push(await readFileAsync(files[i]))
    }
    let typeList=this.props.type.typeList.map((ele)=>{
      if(ele.id===this.state.record.id){
        ele.images=[...ele.images,...uploadList]
      }
      return ele
    })
    this.props.dispatch({
      type: 'type/update',
      payload: {typeList}
    });
    console.log(this.props.type.typeList,typeList); // 上传放到哪个分组下面呢。
  }
  // getBase64(url, callback) {
  //   var Img = new Image(),
  //     dataURL = '';
  //   Img.src = url + '?v=' + Math.random();
  //   Img.setAttribute('crossOrigin', 'Anonymous');
  //   Img.onload = function () {
  //     var canvas = document.createElement('canvas'),
  //       width = Img.width,
  //       height = Img.height;
  //     canvas.width = width;
  //     canvas.height = height;
  //     canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
  //     dataURL = canvas.toDataURL('image/jpeg');
  //     return callback ? callback(dataURL) : null;
  //   };
  // }

  render() {
      const { visible, confirmLoading, items } = this.state;
      const { getFieldDecorator } = this.props.form;
      const { typeList } = this.props.type;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
      const changeInputProps={
        fontSize:'12px',              // 显示字体大小
        iconColor:"#5f68ea",          // 鼠标滑过icon图标颜色
        inputWidth:"1rem",            // 输入框宽度，高度自适应
        showSize:"30",                // 可展示字数，溢出隐藏，滑过展示全部
        amount:"30",                  // 字数限制长度
        type:"number",                // 可输入类型
        name:"name",                  // 回显数据键名
        required:true,                // 是否进行验证
        idName:'id',                  // 添加键名为idName值
        state:this.state,
        handleOk:this.handleOk,       // 点击对号回调
        showInput:this.showInput,     // 显示输入框
        hideInput:this.hideInput,     // 隐藏输入框
      }
    return (
      <>
      <div className={styles.tools}>
        <FlipMove>
            {
              typeList.map((ele,index) => {
                return (
                  <div key={ele.id}>
                    <div className={styles.group}>
                      <i className="iconfont icon-cube"></i>
                      {/* <span className={styles.full}>{e.name}</span> */}
                      <ChangeInput
                        value={ele.name}            //传入内容
                        id={ele.id}                 // 设置id键值
                        record={ele}
                        {...changeInputProps}
                      />
                      <SettingPopover
                        moveDown={this.moveDown}
                        i={index}
                        record={ele}
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
                          <img
                            alt="图片"
                            title="新组件"
                            src={require("./image/thumb.png")}
                          />
                      </div>
                      {
                        ele.images.map((image,i) => {
                          return (
                            <div className={styles.wrapper} key={image}>
                              <Popconfirm
                                title="是否确认删除？"
                                onConfirm={this.confirm}
                                onCancel={this.cancel}
                                okText="确定"
                                cancelText="取消"
                              >
                                <i className={["iconfont icon-close",styles.close].join(' ')}/>
                              </Popconfirm>
                              <img
                                alt="组件类型图片"
                                title="新组件"
                                src={image}
                              />
                            </div>
                          )
                        })
                      }
                      <span
                        title="我来添加组件"
                        draggable="true"
                        className={styles.add}
                        onClick={()=>{this.showEditComponentModal(ele)}}
                      >
                        <i className="iconfont icon-add"></i>
                      </span>
                      <Modal
                        className={styles['edit-modal']}
                        title="请选择操作"
                        okText="确定"
                        cancelText="取消"
                        visible={this.state.isModalVisible}
                        // onOk={handleOk}
                        onCancel={this.closeEditComponentModal}
                        footer={null}
                      >
                       {/* <PicturesWall /> */}
                        <p onClick={()=>{this.onImageUpload(ele)}}>上传组件图片</p>
                        <p onClick={()=>{this.createComponent()}}>绘制组件</p>
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
        > + 添加组件类别</button>
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

export default connect((state) => ({class: state.class,type:state.type}))(WrappedmyComponent);
