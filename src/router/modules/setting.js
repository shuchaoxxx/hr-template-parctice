import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'setting', // 给路由规则添加一个name
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      // meta 路由元信息，存储任意的对象
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
