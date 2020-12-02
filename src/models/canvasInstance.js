const CanvasInstance = {
    namespace: 'canvasInstance',
    // state初始化
    state: {
        instance: '',
    },
    // 修改state值，类似setState
    reducers: {
        //要想改变state中的数据，必须通过reducers，
        //payload是参数
        update(state, action) {
            return {
                ...state,
                instance: action.payload.instance
            }; //...浅拷贝state,并设置update的data值
        }
    }
}
export default CanvasInstance;