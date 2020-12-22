const Imagefiles = {
  namespace: 'type',
  // state初始化
  state: {
    typeList:[
      {id:1,name:'组件类别一',images:[],visible:false,canvasVisible:false},
      {id:2,name:'组件类别二',images:[],visible:false,canvasVisible:false},
      {id:3,name:'组件类别三',images:[],visible:false,canvasVisible:false},
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
