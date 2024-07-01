/**
 * 消息总线 emitter
 *
 * on 注册消息
 * off 取消注册消息监听
 * emit 触发事件
 */
const createEmitter = () => {
  // listeners > {'click': [{fn, scope}, ...], ...}
  const listeners = {}
  return {
    on(key, fn, scope) {
      listeners[key] = (listeners[key] || []).concat({ fn, scope })
    },
    off(key, fn) {
      listeners[key] = (listeners[key] || []).filter((l) => l.fn !== fn)
    },
    emit(key, ...args) {
      ;(listeners[key] || []).forEach(({ fn, scope }) => {
        fn.call(scope, ...args)
      })
    }
  }
}

export default createEmitter
