import React from 'react';
import { connect } from 'dva';

import styles from './index.less';
import { Tools } from '@/utils/tools';
import { get } from '@/services/topology';

import * as FileSaver from 'file-saver';

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

import {
  activityFinal,
  activityFinalIconRect,
  activityFinalTextRect,
  swimlaneV,
  swimlaneVIconRect,
  swimlaneVTextRect,
  swimlaneH,
  swimlaneHIconRect,
  swimlaneHTextRect,
  fork,
  forkHAnchors,
  forkIconRect,
  forkTextRect,
  forkVAnchors
} from 'topology-activity-diagram';
import {
  simpleClass,
  simpleClassIconRect,
  simpleClassTextRect,
  interfaceClass,
  interfaceClassIconRect,
  interfaceClassTextRect
} from 'topology-class-diagram';
import {
  lifeline,
  lifelineAnchors,
  lifelineIconRect,
  lifelineTextRect,
  sequenceFocus,
  sequenceFocusAnchors,
  sequenceFocusIconRect,
  sequenceFocusTextRect
} from 'topology-sequence-diagram';

import CanvasProps from './components/canvasProps';
import { IEvent } from '@/models/event';
import CanvasContextMenu from './components/canvasContextMenu';
import MyComponent from './components/myComponent';
import PicturesWall from './components/picturesWall';

import { Tabs } from 'antd';
import myAnchorFn from './myAnchorFn.js'

const { TabPane } = Tabs;
const C2S = window.C2S;
const canvasOptions = {
  rotateCursor: '/img/rotate.cur'
};
class Index extends React.Component {

  state = {
    id: '',
    data: null,
    event: this.props.event,
    tools: Tools,
    iconfont: { fontSize: '.24rem' },
    selected: {
      node: null,
      line: null,
      multi: false,
      nodes: null,
      locked: false
    },
    contextmenu: {
      position: 'fixed',
      zIndex: '10',
      display: 'none',
      left: '',
      top: '',
      bottom: ''
    }
  };

  componentDidMount() {
    this.canvasRegister();
    canvasOptions.on = this.onMessage;
    this.canvas = new Topology('topology-canvas', this.canvasOptions);
    // console.log('this.canvas',this.canvas);
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
    this.setState({ id: this.props.location.query.id });
    this.getTopo(this.props.location.query.id);
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

    // activity
    registerNode('activityFinal', activityFinal, null, activityFinalIconRect, activityFinalTextRect);
    registerNode('swimlaneV', swimlaneV, null, swimlaneVIconRect, swimlaneVTextRect);
    registerNode('swimlaneH', swimlaneH, null, swimlaneHIconRect, swimlaneHTextRect);
    registerNode('forkH', fork, forkHAnchors, forkIconRect, forkTextRect);
    registerNode('forkV', fork, forkVAnchors, forkIconRect, forkTextRect);

    // class
    registerNode('simpleClass', simpleClass, null, simpleClassIconRect, simpleClassTextRect);
    registerNode('interfaceClass', interfaceClass, null, interfaceClassIconRect, interfaceClassTextRect);

    // sequence
    registerNode('lifeline', lifeline, lifelineAnchors, lifelineIconRect, lifelineTextRect);
    registerNode('sequenceFocus', sequenceFocus, sequenceFocusAnchors, sequenceFocusIconRect, sequenceFocusTextRect);
  }

  onMessage = (event, data) => {
    switch (event) {
      case 'node':
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
      case 'line':
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
            nodes: data.nodes.length > 1 ? data.nodes : null,
            locked: this.getLocked(data)
          }
        });
        break;
      case 'space':
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
    // console.log('onMessage:', event, data);
  };

  onDrag(event, node) {
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
  }

  handlePropsChange = (props, changedValues, allValues) => {
    if (changedValues.node) {
      // 遍历查找修改的属性，赋值给原始Node

      // this.state.selected.node = Object.assign(this.state.selected.node, changedValues.node);
      for (const key in changedValues.node) {
        if (Array.isArray(changedValues.node[key])) {
        } else if (typeof changedValues.node[key] === 'object') {
          for (const k in changedValues.node[key]) {
            this.state.selected.node[key][k] = changedValues.node[key][k];
          }
        } else {
          this.state.selected.node[key] = changedValues.node[key];
        }
      }
      // 通知属性更新，刷新
      this.canvas.updateProps(this.state.selected.node);
    }
  }

  componentDidUpdate() {
    if (this.props.event !== this.state.event) {
      this.setState({ event: this.props.event });
      if (this['handle_' + this.props.event.event]) {
        this['handle_' + this.props.event.event](this.props.event.data);
      }
    }

    if (this.props.location.query.id !== this.state.id) {
      this.setState({ id: this.props.location.query.id });
      this.getTopo(this.props.location.query.id);
    }
  }

  async getTopo(id) {
    if (!id) {
      this.handle_new(null);
      return;
    }
    const data = await get(id);
    this.setState({
      data
    });
    if (data && data.id) {
      this.canvas.open(data.data)
    }
  }

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

  handle_new(data) {
    this.canvas.open({ nodes: [], lines: [] });
  }

  handle_open(data) {
    this.handle_replace(data);
  }

  handle_replace(data) {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      const elem = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        // const name = elem.files[0].name.replace('.json', '');
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result + '';
          try {
            const data = JSON.parse(text);
            // if (data && Array.isArray(data.nodes) && Array.isArray(data.lines)) {
            this.canvas.open(data);
            // }
          } catch (e) {
            return false;
          }
        };
        reader.readAsText(elem.files[0]);
      }
    };
    input.click();
  }

  handle_save(data) {
    FileSaver.saveAs(
      new Blob([JSON.stringify(this.canvas.data)], { type: 'text/plain;charset=utf-8' }),
      `le5le.topology.json`
    );
  }

  handle_savePng(data) {
    this.canvas.saveAsImage('le5le.topology.png');
  }

  handle_saveSvg(data) {
    const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200);
    for (const item of this.canvas.data.nodes) {
      item.render(ctx);
    }

    for (const item of this.canvas.data.lines) {
      item.render(ctx);
    }

    let mySerializedSVG = ctx.getSerializedSvg();
    mySerializedSVG = mySerializedSVG.replace(
      '<defs/>',
      `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
    );

    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

    const urlObject = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);

    const a = document.createElement('a');
    a.setAttribute('download', 'le5le.topology.svg');
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }

  handle_undo(data) {
    this.canvas.undo();
  }

  handle_redo(data) {
    this.canvas.redo();
  }

  handle_copy(data) {
    this.canvas.copy();
  }

  handle_cut(data) {
    this.canvas.cut();
  }

  handle_parse(data) {
    this.canvas.parse();
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

  render() {

    return (
      <div className={styles.page}>
        {/* 左侧菜单 */}
        <div className={styles.tools} >
          <Tabs defaultActiveKey="1" className={styles.tabs} >
            <TabPane tab="系统组件" key="2" >
              {
                this.state.tools.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={styles.title}>{item.group}</div>
                      <div className={styles.buttons}>
                        {
                          item.children.map((btn, i) => {
                            return (
                              <a key={i} title={btn.name} draggable={true} onDragStart={(ev) => { this.onDrag(ev, btn) }}>
                                <i className={'iconfont ' + btn.icon} style={this.state.iconfont} />
                              </a>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </TabPane>
            <TabPane tab="我的组件" key="1" className={styles.tabsStyle} style={{ margin: 0 }}>
              <MyComponent />
            </TabPane>
            <TabPane tab="我的图片" key="3" style={{ color: "red" }}>
              {/* <div>我的图片</div> */}
              <PicturesWall />
            </TabPane>
          </Tabs>
        </div>
        {/* 画布 */}
        <div id="topology-canvas" className={styles.full} onContextMenu={this.hanleContextMenu} />
        {/* 右侧菜单 */}
        {/* <div className={styles.props}>
          <CanvasProps data={this.state.selected} onValuesChange={this.handlePropsChange} />
        </div>
        */}
        {/* 画布右键菜单 */}
        <div style={this.state.contextmenu} >
          <CanvasContextMenu data={this.state.selected} canvas={this.canvas} />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ event: state.event}))(Index);
