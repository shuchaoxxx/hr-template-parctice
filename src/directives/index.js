// 所有的自定义指令

// 导出一个对象
export const imagerror = {
// 指令的对象，会在当前的dom元素插入到节点之后执行
  // inserted钩子函数
  inserted(dom, options) {
    // dom 当前指令的dom对象
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
