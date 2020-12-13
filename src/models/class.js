// 绘制组件的类别
const ClassModel = {
  namespace: 'class',
  state: {
      class:  ''
  },
  reducers: {
      saveClassInfo(state, action) {
          return {
              ...state,
              fileList: action.payload.class
          };
      }
  }
}
export default ClassModel;
