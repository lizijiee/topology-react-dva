import React from 'react';
import { connect } from 'dva';
import { Tools } from '@/utils/tools';
import { Button, Modal } from 'antd';
import styles from './index.less';

class drawComponent extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        tools: Tools,
      };
    }
  componentDidMount() {
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
    console.log(this.props.record)
  };

  render() {
      const { record }=this.props;
    return (
      <>
        <Modal
          className={styles['draw-modal']}
          title="组件绘制"
          okText="确定"
          cancelText="取消"
          // visible={record.canvasVisible}
          visible={true}
          // onOk={handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div className={styles.canvas}>
            <div className={styles.menu}>
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
                                  <a key={i} title={btn.name} draggable={true} onDragStart={(ev) => { this.onDrag(ev, btn) }}>
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
              <div className={styles.line}>
                <div className={styles.item}><span>曲线：</span><i className="icon-curve iconfont"></i></div>
                <div className={styles.item}><span>折线:</span><i className="icon-polyline iconfont"></i></div>
                <div className={styles.item}><span>直线:</span><i className="icon-line iconfont"></i></div>
              </div>
            </div>
            <Button>保存按钮</Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default connect((state) => ({class: state.class,type:state.type}))(drawComponent);
