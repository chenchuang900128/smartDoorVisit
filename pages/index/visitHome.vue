<template>
	<view>
		<view class="grid-title">
			<view></view>
			<text>推荐服务</text>
		</view>
		<view class="grid">
			<view class="grid-item" v-for="(item, index) in gridList" :key="index" @click="gridClick(item, index)">
				<image :src="item.imgSrc"  mode="aspectFill"></image>
				<view v-text="item.name"></view>
			</view>
		</view>
		

	</view>
</template>

<script>
	import Vue from 'vue';
	// #ifdef H5
	import Bridge from '../../common/bridge.js';
	Vue.prototype.$bridge = Bridge;
	// #endif
   
	export default {
		data() {
			return {
				myObjData: {},
				
				gridList: [{
						name: '访客添加',
						imgSrc: "../../static/访客.svg",
					},
					{
						name: '访客记录',
						imgSrc: "../../static/访客记录.svg",
					},

				]
			}
		},
		onLoad: function() {
			//	#ifdef H5
			this.$bridge.registerHandler('dataToJs', (data, responseCallback) => {

				if (typeof data === 'string') {

					this.myObjData = JSON.parse(data);
				} else {
					this.myObjData = data;

				}

				// uni.showModal({
				// 	content: '传输数据: ' + JSON.stringify(this.myObjData),
				// });

				responseCallback(data);
				// oc调用js
			});
			//	#endif



		},
		methods: {
			gridClick(item, index) { //格子菜单点击事件

				if (index == 0) {

					uni.navigateTo({
						// 正向传值
						url: './visitAdd?xm=' + this.myObjData['xm'] + '&zjhm=' + this.myObjData['zjhm'] + '&appKey=' + this.myObjData[
							'appKey']
					});

				} else if (index == 1) {

					uni.navigateTo({
						// 正向传值
						url: './visitList/visitList?xm=' + this.myObjData['xm'] + '&zjhm=' + this.myObjData['zjhm'] + '&appKey=' +
							this.myObjData['appKey']
					});

				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.grid-title {
		display: flex;
		align-items: center;
		font-size: 32upx;
		color: rgba(0, 0, 0, .63);
		padding: 30upx 0;

		view {
			width: 10upx;
			height: 30upx;
			margin-right: 40upx;
		}
	}

	.grid {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		border-top: 1upx solid rgba(172, 172, 172, .2);

		.grid-item {
			box-sizing: border-box;
			width: calc(100% / 3);
			border-bottom: 1upx solid rgba(172, 172, 172, .2);
			border-right: 1upx solid rgba(172, 172, 172, .2);
			text-align: center;
			padding: 42upx 0;
			position: relative;

			image {

				width: 54upx;
				height: 54upx;
				align-items: center;
			}

			view {
				font-size: 28upx;
				margin-top:4upx;
				color: #666666;
			}

		}


	}
</style>
