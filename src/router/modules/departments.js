import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments', // 给路由规则添加一个name
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      // meta 路由元信息，存储任意的对象
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
