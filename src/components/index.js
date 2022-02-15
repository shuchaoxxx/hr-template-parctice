import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    // Vue.component(自定义组件的名称，组件名称)
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
