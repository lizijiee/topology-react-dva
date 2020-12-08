import React from 'react';
import { Form, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/es/form';

import { Node } from 'topology-core/models/node';
import { Line } from 'topology-core/models/line';
import styles from './index.less';
import NodeComponent from './component/nodeComponent';

// export interface CanvasPropsProps {
//   form: FormComponentProps['form'];
//   data: {
//     node?: Node,
//     line?: Line,
//     multi?: boolean,
//     nodes?: Node[],
//     locked?: boolean
//   };
//   onValuesChange: (props: any, changedValues: any, allValues: any) => void;
// }

class CanvasProps extends React.Component {
  state = {
    node: this.props.data.node,
    line: this.props.data.line,
    multi: this.props.data.multi,
  };

  componentDidUpdate() {
    if (this.state.node !== this.props.data.node || this.state.line !== this.props.data.line || this.state.multi !== this.props.data.multi) {
      this.setState({
        node: this.props.data.node,
        line: this.props.data.line,
        multi: this.props.data.multi,
        nodes: this.props.data.nodes,
        locked: this.props.data.locked,
      });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.node) {
      return (
        // data作为初始数据，onValuesChange作为表单域的值改变后回调修改节点
        <NodeComponent  data={this.state} onValuesChange={this.props.onValuesChange}/>
      );
    } else if (this.state.line) {
      return (
        <div className={styles.title}>line属性设置</div>
      );
    } else if (this.state.multi) {
      return (
        <div className={styles.title}>multi属性设置</div>
      );
    }

    return (
      <div>
        <div className={styles.title}>欢迎使用le5le-topology！</div>
        <div className={styles.group}>
          <a className={styles.star} href="https://github.com/le5le-com/topology"
            target="_blank"
          >
            喜欢，点击这里打个star吧
          </a>
          <a href="https://www.yuque.com/alsmile/topology" target="_blank">使用教程</a><br />
          <a href="http://topology.le5le.com/assets/img/topology_wechat.jpg?t=1" target="_blank">微信交流群（大群）</a
          ><br />
          <a href="http://topology.le5le.com/assets/img/topology_wechat2.jpg" target="_blank">微信交流群2</a><br />
          <a href="https://www.yuque.com/alsmile/topology/faq#EVbCgt" target="_blank">联系我们</a>
        </div>
        <div className={styles.title}>[Todo] 未来规划</div>
        <ul className={styles.group}>
          <li>Github issues</li>
          <li>React demo</li>
          <li>Vue3 demo</li>
          <li>系列教程</li>
        </ul>
        <div className={styles.bottom} >
          <div className={styles.title}>
            小提示
          </div>
          <ul className={styles.group}>
            <li>方向键：控制节点移动5个像素</li>
            <li>Ctrl + 方向键：控制节点移动1个像素</li>
            <li>Ctrl + 鼠标移动：移动整个画布</li>
            <li>Ctrl + 鼠标滚轮：缩放</li>
            <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Form.create({
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    console.log('onValuesChange:',changedValues)
    if (onValuesChange) {
      onValuesChange(restProps, changedValues, allValues);
    }
  }
})(CanvasProps);
