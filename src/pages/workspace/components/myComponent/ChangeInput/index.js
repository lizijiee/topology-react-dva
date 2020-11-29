import React from 'react';
import {Icon, Input, message, Tooltip} from 'antd';
import styles from './index.less';
export default class ChangeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        valueCon:'',         //input框回显字段
    }
}

//去空格
trim = (str) => {
    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
};
//点击确定按钮
handleAffirmClick = () => {

    //判断不为空
    if(this.props.required&&this.trim(this.state.valueCon)===''||this.props.required&&this.trim(this.state.valueCon)==='-') {
        message.error(`此字段不能为空及特殊字符'-'`);
        return false
    }

    //回调确定方法
    let obj = {};
    // obj.value = this.state.valueCon;
    // obj.label = this.props.name;
    obj[ this.props.name] = this.state.valueCon;
    //判断是否需要id
    if(this.props.idName){
        obj[this.props.idName] = this.props.id;
    }
    this.props.handleOk(obj);
    //关闭输入框
    this.props.hideInput();
        //判断为数字
    // if(this.props.type&&this.props.type==="number"&&isNaN(this.trim(this.state.valueCon))) {
    //     message.error(`请输入数字`);
    //     return false
    // }

    //判断网址
    // let reg=/^\\{2}[\w-]+\\(([\w-][\w-\s]*[\w-]+[$$]?$)|([\w-][$$]?$))/;
    // if(this.props.type&&this.props.type==="url"&&!reg.test(this.props.valueCon)){
    //     message.error("这网址不是以http://https://开头，或者不是网址！");
    //     return false
    // }

    //判断字数长度
    // if(this.trim(this.state.valueCon).length>this.props.amount){
    //     message.error(`字数不得超过${this.props.amount}个字`);
    //     return false
    // }
};
//input改变
handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
        valueCon:e.target.value
    })
};
componentDidMount() {
    this.setState({
        valueCon:this.props.value,
    })
}
handleDeleteClick = () =>{
    let obj = {};
    // obj.value = this.state.valueCon;
    // obj.label = this.props.name;
    obj[ this.props.name] = this.state.valueCon;
    //判断是否需要id
    if(this.props.idName){
        obj[this.props.idName] = this.props.id;
    }
    this.props.handleDelete(obj);
};

render() {
    const {value,fontSize,iconColor,inputWidth,showSize,record,state,handleCloseClick,hideInput,showInput} = this.props;

    return (
      <React.Fragment>
        <div style={{width:"100%"}}>
            {!(state.index === record.id && state.showInput)?
                <div className={styles.change_input}>
                    <span className={styles.change_input_name}  style={{fontSize:fontSize}} >
                        {showSize&&value.length>showSize?
                            <Tooltip title={value}>
                                 <span >{value.slice(0,showSize)+"..."}</span>
                            </Tooltip> :value
                        }
                        {/* <Icon type="edit"
                              style={{color:iconColor}}
                              className="change_input_hide_change"
                              onClick={this.handleChangeClick}
                        /> */}
                        {this.props.handleDelete&&
                        <Icon type="delete"
                              style={{color:iconColor}}
                              className={styles.change_input_hide_change}
                              onClick={this.handleDeleteClick}
                        />
                        }
                    </span>

                </div>
                :
                <div className={styles.write_input}>
                    <div className={styles.write_input_name} style={{width:inputWidth?inputWidth:'100px'}}>
                        <Input placeholder="请输入"
                               defaultValue={this.props.value==='-'?'':this.props.value}
                               onChange={this.handleChange}
                               style={{height:'25px',margin:'0',fontSize:fontSize}}
                        />
                    </div>
                    <div className={styles.write_input_hide} style={{color:iconColor}}>
                        <Icon type="check-circle" className={styles.write_input_hide_yes} onClick={this.handleAffirmClick}/>
                        <Icon type="close-circle" className={styles.write_input_hide_no} onClick={hideInput} />
                    </div>
                </div>
            }
        </div>
      </React.Fragment>
    )
}
}
