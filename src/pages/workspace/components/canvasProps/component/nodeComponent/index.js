import React from 'react';
import { Form, InputNumber, Collapse, Input, Select, Tabs, Row, Col } from 'antd';
import PicturesWall from '../../../picturesWall'
import styles from './index.less';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;


class NodeComponent extends React.Component {
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
  onChangeImgUrl=(file)=>{
    if (this.props.onValuesChange) {
      this.props.onValuesChange(null, {node:{image:file.url}}, null);
    }
  }
  removeImgUrl=()=>{
    if (this.props.onValuesChange) {
      this.props.onValuesChange(null, {node:{image:''}}, null);
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <Form>
      {/* <div className={styles.title}>位置和大小</div> */}
      <Tabs defaultActiveKey="1" className={styles.tabs}>
        <TabPane tab="外观" key="1" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2', '3','4']}>
            <Panel header="位置和大小" key="1">
              {
              /**
              * 渲染位置和大小的表单
              */
                <Row>
                  <Col span={12}>
                    <Form.Item className={styles.formItem} label="X(px)">
                        {getFieldDecorator('node.rect.x', { initialValue: this.state.node.rect.x })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItem} label="Y(px)">
                        {getFieldDecorator('node.rect.y', { initialValue: this.state.node.rect.y })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItem} label="宽(px)">
                        {getFieldDecorator('node.rect.width', { initialValue: this.state.node.rect.width })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItem} label="高(px)">
                        {getFieldDecorator('node.rect.height', { initialValue: this.state.node.rect.height })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item className={styles.formItem} label="角度(deg)">
                        {getFieldDecorator('node.rotate', { initialValue: this.state.node.rotate })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                </Row>
              }
            </Panel>
            <Panel header="样式" key="2">
              {
                /**
                * 渲染样式的表单
                */
                <Row>
                  <Col span={24}>
                    <Form.Item label="线条颜色">
                      {getFieldDecorator('node.strokeStyle', {
                        initialValue: this.state.node.strokeStyle
                      })(<Input type="color" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="线条样式">
                      {getFieldDecorator('node.dash', {
                        initialValue: this.state.node.dash
                      })(
                        <Select style={{ width: '95%' }}>
                          <Option value={0}>_________</Option>
                          <Option value={1}>---------</Option>
                          <Option value={2}>_ _ _ _ _</Option>
                          <Option value={3}>- . - . - .</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="线条宽度">
                      {getFieldDecorator('node.lineWidth', {
                        initialValue: this.state.node.lineWidth
                      })(<InputNumber style={{ width: '100%' }} />)}
                    </Form.Item>
                  </Col>
                </Row>
              }
            </Panel>
            <Panel header="文字" key="3" >
              {
                /**
                * 渲染字体的表单
                */
                <Row>
                  <Col span={24}>
                    <Form.Item label="字体颜色">
                      {getFieldDecorator('node.font.color', {
                        initialValue: this.state.node.font.color
                      })(<Input type="color" />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="字体类型">
                      {getFieldDecorator('node.font.fontFamily', {
                        initialValue: this.state.node.font.fontFamily
                      })(<Input />)}
                    </Form.Item>
                  </Col>
                  <Col span={11} offset={1}>
                    <Form.Item label="字体大小">
                      {getFieldDecorator('node.font.fontSize', {
                        initialValue: this.state.node.font.fontSize
                      })(<InputNumber />)}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="内容">
                      {getFieldDecorator('node.text', {
                        initialValue: this.state.node.text
                      })(<TextArea />)}
                    </Form.Item>
                  </Col>
                </Row>
              }
            </Panel>
            <Panel header="图片" key="4" className={styles.picture}>
              <span className={styles.gray}>图片、字体图标同时存在时，图片优先</span>
              <a href="#" style={{display:'block'}} onClick={this.removeImgUrl}>取消</a>
              <PicturesWall onChangeImgUrl={this.onChangeImgUrl}></PicturesWall>
              {/* <Row>
                <Col span={12}>
                  <Form.Item label="图片选择" labelCol={{ span: 18 }} wrapperCol={{ span: 6 }}>
                   {getFieldDecorator('node.image', {
                      initialValue: this.state.node.image
                    })(<span
                      title="我来添加组件"
                      draggable="true"
                      className={styles.add}
                      // onClick={()=>{this.showEditComponentModal(ele)}}
                    >
                      <i className="iconfont icon-add"></i>
                    </span>)}

                   </Form.Item>
                </Col>
              </Row> */}
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="事件" key="2" style={{ margin: 0 }} className={styles.tabsStyle} >
        </TabPane>
        <TabPane tab="动效" key="3" style={{ margin: 0 }}>
        </TabPane>
      </Tabs>
    </Form>
    );
  }
}

export default Form.create({
  // props, changedValues, allValues
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    if (onValuesChange) {
      console.log(restProps,changedValues,allValues)
      onValuesChange(restProps, changedValues, allValues);
    }
  }
})(NodeComponent);
