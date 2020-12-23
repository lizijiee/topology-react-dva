import React from 'react';
import { connect } from 'dva';
import { Modal, Button } from 'antd';

import styles from './index.less';
import { Tools } from '@/utils/drawTools';


import { Topology } from 'topology-core';
// import { Options } from 'topology-core/options';
import { registerNode } from 'topology-core/middles';
import {
  flowData,
  flowDataAnchors,
  flowDataIconRect,
  flowDataTextRect,
  flowSubprocess,
  flowSubprocessIconRect,
  flowSubprocessTextRect,
  flowDb,
  flowDbIconRect,
  flowDbTextRect,
  flowDocument,
  flowDocumentAnchors,
  flowDocumentIconRect,
  flowDocumentTextRect,
  flowInternalStorage,
  flowInternalStorageIconRect,
  flowInternalStorageTextRect,
  flowExternStorage,
  flowExternStorageAnchors,
  flowExternStorageIconRect,
  flowExternStorageTextRect,
  flowQueue,
  flowQueueIconRect,
  flowQueueTextRect,
  flowManually,
  flowManuallyAnchors,
  flowManuallyIconRect,
  flowManuallyTextRect,
  flowDisplay,
  flowDisplayAnchors,
  flowDisplayIconRect,
  flowDisplayTextRect,
  flowParallel,
  flowParallelAnchors,
  flowComment,
  flowCommentAnchors,
  myShape,  // 形状
  myIconRect,  // 图片位置区域
  myTextRect,  //文字位置区域
  myAnchors  //锚点
} from 'topology-flow-diagram';
import { rectangle } from 'topology-core/middles/nodes/rectangle';

import myAnchorFn from '../../../myAnchorFn';

const canvasOptions = {
  rotateCursor: '/img/rotate.cur',
};
const lineMenu=[
  {name:'曲线',type:'curve'},
  {name:'折线',type:'polyline'},
  {name:'直线',type:'line'}
]
class drawComponent extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        tools: Tools,
        canvasVisible: this.props.record.canvasVisible,
        currentIndex: 0,
        event: '',
        selected: {
          node: null,
          line: null,
          multi: false,
          nodes: null,
          locked: false,
        },
        canvas: {
          lineName: 'curve',
          fromArrowType: '',
          toArrowType: 'triangleSolid',
          scale: 1,
          locked: 0,
        },
      };
    }
    componentDidMount() {
      this.canvasRegister();
      canvasOptions.on = this.onMessage;
      // setTimeout(()=>{
        // this.canvas = new Topology('draw-canvas', canvasOptions);
      // },500) // 确保画布的父元素存在
      document.onclick = event => {
        this.setState({
          contextmenu: {
            display: 'none',
            left: '',
            top: '',
            bottom: ''
          }
        });
      }
      // if(this.props.location.query.id){
      //   this.setState({ id: this.props.location.query.id });
      //   this.getTopo(this.props.location.query.id);
      // }
    }
    canvasRegister() {
      registerNode('rectangle', rectangle, myAnchorFn, null, null, true);
      registerNode('flowData', flowData, flowDataAnchors, flowDataIconRect, flowDataTextRect);
      registerNode('flowSubprocess', flowSubprocess, null, flowSubprocessIconRect, flowSubprocessTextRect);
      registerNode('flowDb', flowDb, null, flowDbIconRect, flowDbTextRect);
      registerNode('flowDocument', flowDocument, flowDocumentAnchors, flowDocumentIconRect, flowDocumentTextRect);
      registerNode(
        'flowInternalStorage',
        flowInternalStorage,
        null,
        flowInternalStorageIconRect,
        flowInternalStorageTextRect
      );
      registerNode(
        'flowExternStorage',
        flowExternStorage,
        flowExternStorageAnchors,
        flowExternStorageIconRect,
        flowExternStorageTextRect
      );
      registerNode('flowQueue', flowQueue, null, flowQueueIconRect, flowQueueTextRect);
      registerNode('flowManually', flowManually, flowManuallyAnchors, flowManuallyIconRect, flowManuallyTextRect);
      registerNode('flowDisplay', flowDisplay, flowDisplayAnchors, flowDisplayIconRect, flowDisplayTextRect);
      registerNode('flowParallel', flowParallel, flowParallelAnchors, null, null);
      registerNode('flowComment', flowComment, flowCommentAnchors, null, null);
    }
    /**
     * 监听画布上元素的事件
     * @params {string} event - 事件名称
     * @params {object} data - 节点数据
     */
    onMessage = (event, data) => {
      switch (event) {
        case 'node':  // 节点
        case 'addNode':
          this.setState({
            selected: {
              node: data,
              line: null,
              multi: false,
              nodes: null,
              locked: data.locked
            }
          });
          break;
        case 'line': // 连线
        case 'addLine':
          this.setState({
            selected: {
              node: null,
              line: data,
              multi: false,
              nodes: null,
              locked: data.locked
            }
          });
          break;
        case 'multi':
          this.setState({
            selected: {
              node: null,
              line: null,
              multi: true,
              // nodes: data.nodes.length > 1 ? data.nodes : null,
              nodes: data.length > 1 ? data.nodes : null,
              locked: this.getLocked(data)
            }
          });
          break;
        case 'space':  // 空白处
          this.setState({
            selected: {
              node: null,
              line: null,
              multi: false,
              nodes: null,
              locked: false
            }
          });
          break;
        case 'moveOut':
        break;
        case 'moveNodes':
        case 'resizeNodes':
          if (data.length > 1) {
            this.setState({
              selected: {
                node: null,
                line: null,
                multi: true,
                nodes: data,
                locked: this.getLocked({ nodes: data })
              }
            });
          } else {
            this.setState({
              selected: {
                node: data[0],
                line: null,
                multi: false,
                nodes: null,
                locked: false
              }
            });
          }
          break;
        case 'resize':
        case 'scale':
        case 'locked':
          if (this.canvas) {
            this.props.dispatch({
              type: 'canvas/update',
              payload: {
                data: this.canvas.data
              }
            });
          }
          break;
      }
      // tslint:disable-next-line:no-console
    };

    hanleContextMenu = (event) => {
      event.preventDefault()
      event.stopPropagation()

      if (event.clientY + 360 < document.body.clientHeight) {
        this.setState({
          contextmenu: {
            position: 'fixed',
            zIndex: '10',
            display: 'block',
            left: event.clientX + 'px',
            top: event.clientY + 'px',
            bottom: ''
          }
        });

      } else {
        this.setState({
          contextmenu: {
            position: 'fixed',
            zIndex: '10',
            display: 'block',
            left: event.clientX + 'px',
            top: '',
            bottom: document.body.clientHeight - event.clientY + 'px'
          }
        });
      }
    }
    getLocked(data) {
      let locked = true
      if (data.nodes && data.nodes.length) {
        for (const item of data.nodes) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }
      if (locked && data.lines) {
        for (const item of data.lines) {
          if (!item.locked) {
            locked = false
            break
          }
        }
      }

      return locked
    }

    onDrag(event, node) {
      event.dataTransfer.setData('Text', JSON.stringify(node.data));
    }
    handle_curve(data) {
      this.canvas.data.lineName = 'curve';
      this.props.dispatch({
        type: 'canvas/update',
        payload: {
          data: this.canvas.data
        }
      });
    }

    handle_polyline(data) {
      this.canvas.data.lineName = 'polyline';
      this.props.dispatch({
        type: 'canvas/update',
        payload: {
          data: this.canvas.data
        }
      });
    }
    handle_line(data) {
      this.canvas.data.lineName = 'line';
      this.props.dispatch({
        type: 'canvas/update',
        payload: {
          data: this.canvas.data
        }
      });
    }
    handle_save(data) {
      if (!this.canvas) {
        return;
      }
      console.log('待保存数据',this.canvas.data);
      console.log(this.canvas)
      this.canvas.data.lineName = 'curve';
      this.canvas.toImage('image/png', 1, async (blob) => {
        // const ret =await save(this.canvas.data)
        /*
            共计三步骤
            1. 提交图片,若原来存在,先删除原有图片
            2. 提交图片成功返回值
                url: "/image/topology/thumb_57a4ad3348f4ef02.png"
            3. 提交含图片url全部data数据
                this.data.image = res.url
        */
      });
      if (this.state.component) {
        this.state.componentData = this.canvas.toComponent();
      }
    }
    handleOK=()=>{
      this.setState({event:'save'});
      this.props.record.canvasVisible=false;
      const typeList=JSON.parse(JSON.stringify(this.props.type.typeList))
      this.props.dispatch({
        type: 'type/update',
        payload: {
          typeList
        }
      });
    }
    handleCancel = () => {
      this.props.record.canvasVisible=false;
      const typeList=JSON.parse(JSON.stringify(this.props.type.typeList))
      this.props.dispatch({
        type: 'type/update',
        payload: {
          typeList
        }
      });
    };
    componentDidUpdate(prevProps,prevState){
      if (!this.state.event&&this.props.record.canvasVisible !== this.state.canvasVisible) {
        setTimeout(()=>{
          this.canvas = new Topology('draw-canvas', canvasOptions);
        },500) // 确保画布的父元素存在
      }
        // onMenuClick 方法
        if (this['handle_' + this.state.event]) {
          this['handle_' + this.state.event]();
        }
    }
    setCurrentIndex=(event,ele,i)=>{
      event.stopPropagation();
      this.setState({currentIndex: i,event:ele.type,});
    }
    handlePropsChange(){
      // this.state.selected.node[key][k] = changedValues.node[key][k];
      // 通知属性更新，刷新
      this.canvas.updateProps(this.state.selected.node);
    }
  render() {
    const { record }=this.props;
    return (
      <>
        <Modal
          className={styles['draw-modal']}
          title="组件绘制"
          destroyOnClose
          okText="确定"
          cancelText="取消"
          visible={record.canvasVisible}
          // visible={true}
          // onOk={handleOk}
          onCancel={this.handleCancel}
          footer={null}
          afterClose={()=>{
            this.setState({event: '',currentIndex: 0})
          }}
        >
          <div className={styles.canvas}>
            <div className={styles.menu} >
              <div className={styles.tools}>
              {
                this.state.tools.map((item, index) => {
                  if(item.group==='基本形状'){
                    return (
                      <div key={index}>
                        {/* <div className={styles.title}>{item.group}</div> */}
                        <div className={styles.buttons}>
                          {
                            item.children.map((btn, i) => {
                              return (
                                <a
                                  key={i}
                                  title={btn.name}
                                  draggable={true}
                                  onDragStart={(ev) => { this.onDrag(ev, btn) }}
                                >
                                  <i className={'iconfont ' + btn.icon} style={this.state.iconfont} />
                                </a>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  }
                })
              }
              </div>
              <div className={styles.line} >
                {
                  lineMenu.map((item, i)=>(
                    <div
                      // className={styles.item}
                      className={this.state.currentIndex===i?`${styles.item} ${styles.active}`:styles.item}
                      key={item.name}
                      onClick={(e)=>{this.setCurrentIndex(e,item,i)}}
                    >
                      <span>{item.name} :</span>
                      <i className={`icon-${item.type} iconfont`}></i>
                    </div>
                  ))
                }
                {/* <div className={styles.item}><span>曲线：</span><i className="icon-curve iconfont"></i></div>
                <div className={styles.item}><span>折线:</span><i className="icon-polyline iconfont"></i></div>
                <div className={styles.item}><span>直线:</span><i className="icon-line iconfont"></i></div> */}
              </div>
            </div>
            <div
              id='draw-canvas'
              className={styles['draw-canvas']}
              onContextMenu={this.hanleContextMenu}
            />
          </div>
            <Button onClick={()=>{ this.handleOK()}}>保存按钮</Button>
        </Modal>
      </>
    );
  }
}

export default connect((state) => ({class: state.class,type:state.type}))(drawComponent);
