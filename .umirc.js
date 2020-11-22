
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // routes: [
  //   {
  //     exact: true,
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   },
  //   {
  //     exact: true,
  //     path: '/workspace',
  //     component: '../pages/workspace/index',
  //   }
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      // dynamicImport: false,
      title: 'topology-react',
      dll: false,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api/': {
      target: 'http://topology.le5le.com',
      changeOrigin: true
    },
    '/image/': {
      target: 'http://topology.le5le.com',
      changeOrigin: true
    }
  }
}
