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
  }, {
    path: 'detail/:id', // : 是动态路由传参获取时使用this.$router.params    ?是query传参获取时使用this.$router.query
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  }]
}
