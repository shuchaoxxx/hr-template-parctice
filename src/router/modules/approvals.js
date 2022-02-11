import Layout from '@/layout'
export default {
  path: '/approvals',
  name: 'approvals', // 给路由规则添加一个name
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      // meta 路由元信息，存储任意的对象
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
