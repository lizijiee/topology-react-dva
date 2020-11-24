import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

class myComponent extends React.Component{

  componentDidMount() {
  }

  render() {
    return (
      <>
      <div className={styles.tools}>
        <div>
          <div className={styles.group}>
            <i className="iconfont icon-cube"></i>
            <span className={styles.full}>组件类别一</span>
            <i className="iconfont icon-config"></i>
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
            <span className={styles.full}>组件类别二</span>
            <i className="iconfont icon-config"></i>
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
            <i className="iconfont icon-config"></i>
          </div>
          <div className={styles.buttons}>
            <img draggable="true" title="新组件" src={require("./image/thumb.png")} />
            <span title="我来添加组件" draggable="true" className="add">
              <i  className="iconfont icon-add"></i>
            </span>
          </div>
        </div>
      </div>
      <div class={styles.setting}>
        <button class={styles.button}> + 添加组件库</button>
      </div>
      </>
    );
  }
}
// export default connect((state) => ({event: state.event}))(myComponent);
export default connect((state) => ({}))(myComponent);
