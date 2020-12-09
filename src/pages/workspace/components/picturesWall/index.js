import React from 'react';
import { connect } from 'dva';
import { Upload, Modal } from 'antd';
import styles from './index.less';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    console.log('预览',file)
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });
  };

  handleChange = ({ fileList }) => this.props.dispatch({type:'image/update',payload:{fileList}});

  render() {
    const {onChangeImgUrl}=this.props;
    const { fileList }=this.props.image;
    const { previewVisible, previewImage, previewTitle } = this.state;
    const uploadButton = (
      <div>
        空
        {/* <i className='iconfont icon-add'></i>
        <div style={{ marginTop: 8 }}>Upload</div> */}
      </div>
    );
    return (
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          className={onChangeImgUrl?styles['preview-up-load']:styles['up-load']}
          multiple={true}
          fileList={fileList}
          onPreview={onChangeImgUrl}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} onClick={onChangeImgUrl&&onChangeImgUrl}/>
        </Modal>
      </>
    );
  }
}

export default connect((state) => ({image: state.image }))(PicturesWall);
