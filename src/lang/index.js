// 多语言实例化的文件

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import elementEN from 'element-ui/lib/locale/lang/en'
import customEN from './en' // 自定义语言包
import customZH from './zh' // 自定义语言包
Vue.use(VueI18n) // 完成全局注册
export default new VueI18n({
  locale: Cookie.get('language') || 'zh',
  messages: {
    'zh': { ...elementZH, customZH },
    'en': { ...elementEN, customEN }
    // zh: Object.assign(...elementZH, customZH),
    // en: Object.assign(...elementEN, customEN)
  }
})
