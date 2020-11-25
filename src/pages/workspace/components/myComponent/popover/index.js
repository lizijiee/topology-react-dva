import React from 'react';
import { connect } from 'dva';
import { Popover, Button } from 'antd';

import styles from './index.less';


class myComponent extends React.Component{

    componentDidMount() {
    }
    
  render() {
    return (
      <>
       <Popover placement="rightTop" title={text} content={content} trigger="click">
        <Button>RT</Button>
      </Popover>
      </>)
  }
}
export default connect((state) => ({}))(myComponent);
