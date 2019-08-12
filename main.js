import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
Vue.prototype.$baseUrl="http://localhost:9000/equipmentServer/"
App.mpType = 'app'

/**
 * 随机打乱数组
 */
Array.prototype.shuffle = function() {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
}
const app = new Vue({
    ...App
})
app.$mount()
