import React from 'react';
import styles from './index.less';
import Headers from './headers';

class BasicLayout extends React.Component {

  render(){
    return (
    <div className={styles.page}>
      <Headers />
      <div className={styles.body}>{this.props.children}</div>
    </div>
  )
}
};

export default BasicLayout;
