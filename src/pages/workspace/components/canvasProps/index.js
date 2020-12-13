import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Node } from 'topology-core/models/node';
import { Line } from 'topology-core/models/line';
import styles from './index.less';
import NodeComponent from './component/nodeComponent';
const { Option } = Select;

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
        <div className={styles.title}>项目设置</div>
        {
          /**
          * 渲染项目设置表单
          */
          <Row>
            <Col>
              <Form.Item className={styles.formItem} label="图文名称：" labelCol={{ span: 8 }} wrapperCol={{ span: 15 }}>
                  {getFieldDecorator('state.name', { initialValue: this.state.node?this.state.node.name:'空白文件'})(<Input />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="图文类别：" labelCol={{ span: 8 }} wrapperCol={{ span: 15 }}>
                {getFieldDecorator('state.class', {
                  initialValue: !!this.props.className?this.props.className:'组件类别一'
                })(
                  <Select style={{ width: '95%' }}>
                    <Option value={'组件类别一'}>组件类别一</Option>
                    <Option value={'组件类别二'}>组件类别二</Option>
                    <Option value={'组件类别三'}>组件类别三</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        }
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

const WrappedCanvasProps= Form.create({
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    console.log('onValuesChange:',changedValues)
    if (onValuesChange) {
      onValuesChange(restProps, changedValues, allValues);
    }
  }
})(CanvasProps);

export default connect((state) => ({}))(WrappedCanvasProps);
