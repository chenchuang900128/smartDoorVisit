<template>
	<view class="content" v-if="seen">
		<form @submit="formSubmit" @reset="formReset">
			<view class="inputView">
				<text class="leftTitle">访客姓名</text>
				<input class="rightInput" name="name" value="" placeholder="请输入姓名" />
			</view>

			<view class="line"></view>

			<view class="inputView">
				<text class="leftTitle">访客手机号</text>
				<input class="rightInput" name="phone" value="" placeholder="请输入手机号" />
			</view>

			<view class="line"></view>

			<view class="inputView">
				<text class="leftTitle">来访人数</text>
				<picker class="picker" @change="bindPickerChangeTwo" :value="personIndex" :range="personArray">
					<view class="pickView">{{ personArray[personIndex] }}</view>
				</picker>
				<image class="arrowImg0" mode="aspectFit" src="../../static/arrow_right@2x.png"></image>
			</view>

			<view class="line"></view>

			<view class="inputView">
				<text class="leftTitle">来访事由</text>
				<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
					<view class="pickView">{{ array[index] }}</view>
				</picker>
				<image class="arrowImg0" mode="aspectFit" src="../../static/arrow_right@2x.png"></image>
			</view>

			<view class="line"></view>

			<view class="inputView">
				<text class="leftTitle">来访时间</text>
				<picker class="picker" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="pickView">{{ date }}</view>
				</picker>
				<image class="arrowImg0" mode="aspectFit" src="../../static/arrow_right@2x.png"></image>
			</view>

			<view class="line"></view>


			<view class="uni-btn-v">
				<button class="botBtn" type="primary" form-type="submit">下一步</button>
				<view class="tipText"> </view>
			</view>

		</form>
	</view>
</template>

<script>
	import Vue from 'vue';
	import ALLURL from "@/common/allUrl.js";


	// #ifdef H5
	import Bridge from '../../common/bridge.js';
	Vue.prototype.$bridge = Bridge;
	// #endif

	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				seen: true,
				index: 0,
				array: ['搬家放行', '送货上门', '装修放行', '家政服务', '朋友来访'],
				personIndex: 0,
				personArray: ['1', '2', '3', '4', '5', '6'],
				date: currentDate,
				fwzl: '',
				myFormatData: {},
				myObjData: {},

			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad: function(e) {

			this.myObjData = {
				xm: e.xm,
				zjhm: e.zjhm,
				appKey: e.appKey,
			};
			this.fwzl = ALLURL.ZJValidString(e.fyid);

			uni.showModal({
				content: '传输数据: ' + JSON.stringify(this.fwzl),
			});
			console.log(ALLURL.baseURL);
			console.log('中国=' + this.fwzl);

			if (this.fwzl.length < 1) {

				this.requestContractInfo();

			}


		},
		methods: {
			// 请求合同信息
			requestContractInfo: function(formdata, callBack) {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: ALLURL.baseURL + '/zjzl/a/info/zjLogin/GIHSSContQuery',
					method: 'POST',
					data: {
						zjhm: this.myObjData.zjhm,
						appKey: this.myObjData.appKey
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: res => {
						uni.hideLoading();

						var dataDic = res.data;
						console.log("合同查询接口调用成功 " + JSON.stringify(dataDic));
						if (Number(dataDic['code']) == 0) {

							this.fwzl = ALLURL.ZJValidString(dataDic['data']['fyid']);

						} else {

							uni.showModal({
								content: dataDic['msg'],
								showCancel: false
							});
						}



					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},
			// 请求添加访客
			requestAddVisits: function(formdata, callBack) {

				let requestObj = {
					roomKey: ALLURL.ZJValidString(this.fwzl), //房屋标识
					phone: this.myFormatData.phone, // 唯一标识
					visitingTime: this.date + ' 00:00:00', // 来访时间
					visitingNum: this.personArray[this.personIndex], //来访人数
					visitingReason: this.array[this.index], //来访事由
					visitingName: this.myFormatData.name, //来访姓名
					primaryKey: '',
				};
				console.log("请求参数=" + JSON.stringify(requestObj));
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: ALLURL.baseURL + ALLURL.KTradeid_addVisit,
					method: 'POST',
					data: requestObj,
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: res => {
						uni.hideLoading();
						var dataDic = res.data;
						console.log("访客接口调用成功" + JSON.stringify(res));
						if (Number(dataDic['code']) == 0) {

							callBack(true);

							uni.navigateTo({
								url: './visitResult/visitResult?requestObj=' + JSON.stringify(requestObj) + '&qrcodeText=' + dataDic[
									'data'],
							});

						} else {

							uni.showModal({
								content: dataDic['msg'],
								showCancel: false
							});
						}


					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var formdata = e.detail.value;
				this.myFormatData = formdata;

				if ((ALLURL.ZJValidString(formdata['name'])).length < 1) {
					uni.showModal({
						content: '请输入姓名',
						showCancel: false
					});
					return;
				}
				if ((ALLURL.ZJValidString(formdata['phone'])).length < 11) {
					uni.showModal({
						content: '请输入手机号码',
						showCancel: false
					});
					return;
				}


				this.requestAddVisits({}, function(isRequestSuceess) {


				});


			},

			bindDateChange: function(e) {
				this.date = e.target.value;
			},

			bindPickerChange: function(e) {
				this.index = e.target.value;
				console.log(e.target.value);
			},
			bindPickerChangeTwo: function(e) {
				this.personIndex = e.target.value;
				console.log(e.target.value);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {

					day = day;

				} else if (type === 'end') {
					year = year + 1;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	};
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: auto;
	}

	.inputView {
		flex-direction: row;
		display: flex;
		height: 100rpx;
		align-items: center;
		width: 100%;
	}

	.line {
		width: 90%;
		height: 2rpx;
		margin-left: -2rpx;
		background-color: #f8f8f8;
		margin-left: 5%;
	}

	.leftTitle {
		margin-left: 40rpx;
		width: 184rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.picker {
		margin-left: 20rpx;
		width: 80%;
		height: 100rpx;
		font-size: 30rpx;
	}

	.pickView {
		font-size: 32rpx;
		padding-top: 30rpx;
		height: 100rpx;
		font-size: 30rpx;

	}

	.rightInput {
		width: 80%;
		font-size: 30rpx;
	}

	.arrowImg {
		width: 30rpx;
		height: 30rpx;
		margin-left: 57%;
	}

	.arrowImg0 {
		margin-right: 60rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.botBtn {
		width: 90%;
		margin-top: 80rpx;
	}

	.tipText {
		width: 100%;
		margin-left: 60rpx;
		align-items: center;
		justify-content: center;
		color: #666666;
		margin-top: 50rpx;
		font-size: 28rpx;
	}
</style>
