import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 测试日志是否屏蔽    ==不屏蔽  !== 屏蔽
if (uni.getSystemInfoSync().platform !== "1") {
	console.log = () => {}
}

const app = new Vue({
    ...App
})
app.$mount()
