import Layout from '@/layout'
export default {
  path: '/social',
  name: 'social', // 给路由规则添加一个name
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/social'), // 动态添加组件
      // meta 路由元信息，存储任意的对象
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
