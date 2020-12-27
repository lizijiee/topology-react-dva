import React from 'react';
import styles from './index.less';



export default class CanvasContextMenu extends React.Component {
  onTop() {
    if (this.props.data.node) {
      this.props.canvas.top(this.props.data.node)
    }

    if (this.props.data.nodes) {
      for (const item of this.props.data.nodes) {
        this.props.canvas.top(item)
      }
    }

    this.props.canvas.render()
  }

  onBottom() {
    if (this.props.data.node) {
      this.props.canvas.bottom(this.props.data.node)
    }

    if (this.props.data.nodes) {
      for (const item of this.props.data.nodes) {
        this.props.canvas.bottom(item)
      }
    }

    this.props.canvas.render()
  }

  onCombine(stand) {
    if (!this.props.data.nodes) {
      return
    }
    this.props.canvas.combine(this.props.data.nodes, stand)
    this.props.canvas.render()
  }

  onUncombine = () => {
    if (!this.props.data.node) {
      return
    }
    this.props.canvas.uncombine(this.props.data.node)
    this.props.canvas.render()
  }

  onLock = () => {
    this.props.data.locked = !this.props.data.locked
    if (this.props.data.node) {
      this.props.data.node.locked = this.props.data.locked
    }
    if (this.props.data.nodes) {
      for (const item of this.props.data.nodes) {
        item.locked = this.props.data.locked
      }
    }
    this.props.canvas.render(true)
  }

  render() {
    return (
      <div className={styles.menus}>
        <div>
          <a className={(this.props.data.node || this.props.data.nodes) ? '' : styles.disabled} onClick={this.onTop}>置顶</a>
        </div>
        <div>
          <a className={(this.props.data.node || this.props.data.nodes) ? '' : styles.disabled} onClick={this.onBottom}>置底</a>
        </div>
        <div className={styles.line} />
        {
          this.props.data.nodes ? (
            <div>
              <a onClick={() => { this.onCombine(false) }}>组合</a>
              <div>
                <a onClick={() => { this.onCombine(true) }}>包含</a>
              </div>
            </div>
          ) : null
        }
        {
          this.props.data.node && this.props.data.node.name === 'combine' ? (
            <div >
              <a onClick={this.onUncombine}>取消组合/包含</a>
            </div>
          ) : null

        }
        <div>
          <a
            className={(this.props.data.node || this.props.data.nodes) ? '' : styles.disabled}
            onClick={this.onLock}
          >{this.props.data.locked ? '解锁' : '锁定'}</a>
        </div>
      </div >
    );
  }
}
