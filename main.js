import Vue from 'vue'
import App from './App'
import ALLURL from '@/common/allUrl.js'
import { installMock } from '@/common/mock.js'

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

// 启用前端 Mock（仅在配置开启时生效）
if (ALLURL && ALLURL.MOCK) {
	installMock()
}
