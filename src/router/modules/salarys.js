import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys', // 给路由规则添加一个name
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      // meta 路由元信息，存储任意的对象
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
