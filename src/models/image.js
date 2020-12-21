const Imagefiles = {
  namespace: 'type',
  // state初始化
  state: {
    typeList:[
      {id:1,name:'组件类别一',images:[]},
      {id:2,name:'组件类别二',images:[]},
      {id:3,name:'组件类别三',images:[]},
    ],
  },
  reducers: {
      update(state, action) {
          return {
              ...state,
              typeList: action.payload.typeList
          };
      },
      add(state, action) {
          return {
              ...state,
              typeList: action.payload.typeList
          };
      },
  }
}
export default Imagefiles;
