import Layout from '@/layout'
export default {
  path: '/permission',
  name: 'permissions', // 给路由规则添加一个name
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      // meta 路由元信息，存储任意的对象
      name: 'permissions',
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
