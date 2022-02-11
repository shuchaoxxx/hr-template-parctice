import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees', // 给路由规则添加一个name
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    // meta 路由元信息，存储任意的对象
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }]
}
