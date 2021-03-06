import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'
import * as filters from '@/filters'
import Components from '@/components'
import checkPermission from '@/mixin/checkPermission'
import i18n from '@/lang'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

//  element-ui自定义组件的注册、还有自定义语言包的使用
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// Object.keys用来遍历对象，把对象的键形成一个数组。
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.mixin(checkPermission)
Vue.config.productionTip = false
Vue.use(Components)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
