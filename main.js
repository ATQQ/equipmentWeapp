import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
Vue.prototype.$baseUrl = "http://localhost:9000/equipmentServer/"
App.mpType = 'app'

/**
 * 随机打乱数组
 */
Array.prototype.shuffle = function() {
	let m = this.length,
		i;
	while (m) {
		i = (Math.random() * m--) >>> 0;
		[this[m], this[i]] = [this[i], this[m]]
	}
	return this;
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * @param {Object} fmt
 */ 
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

const app = new Vue({
	...App
})
app.$mount()
