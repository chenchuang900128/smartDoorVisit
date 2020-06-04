<template>
	<view class="content" v-if="seen">
		<form @submit="formSubmit" @reset="formReset">
			<view class="inputView">
				<text class="leftTitle">姓名</text>
				<input class="rightInput" name="name" value="陈创" placeholder="请输入姓名" />
			</view>

			<view class="line"></view>

			<view class="inputView">
				<text class="leftTitle">证件号码</text>
				<input class="rightInput" name="zjhm" value="430423199001281412" placeholder="请输入证件号码" />
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
				<input class="rightInput" name="acctNo" value="6236683320000581124" placeholder="请输入银行卡号" />
			</view>
			<view class="line"></view>

			<!-- <view class="inputView">
				<text class="leftTitle">预留手机号</text>
				<input class="rightInput" name="phone" value="13249746918" placeholder="请输入银行卡号预留手机号" />
			</view>
			<view class="line"></view> -->

			<view class="uni-btn-v">
				<button class="botBtn" type="primary" form-type="submit">下一步</button>
				<view class="tipText">  </view>
			</view>
		</form>
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
				index: 0,
				requestCount: 0,
				seen: true,
				array: ['中介看房','搬家放行', '送货上门','装修放行','家政服务','朋友来访'],

				myFormatData: {},
				myObjData: {}
			};
		},

		onLoad: function(e) {
		
		   this.myObjData = {xm:e.xm,zjhm:e.zjhm,appKey:e.appKey};
		  
		   this.requestRefundInfo({},function(isRequestSuceess){
			   
		   });
		},
		methods: {
			// 请求退款信息
			requestRefundInfo: function(formdata, callBack) {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'http://193.112.16.196:8080/zjzl/SK/json/Z034',
					method: 'POST',
					data: {
						
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: res => {
						var dataDic = res.data;
						console.log("退款记录接口调用成功 " + dataDic);
					    if(Number(dataDic['code']) == 0){
							
							var jsonArr = dataDic["datalist"];
							if(jsonArr.length > 0){
								
								this.seen = true;
								
							}
							
						}
						else{
							
							uni.showModal({
								content: dataDic['msg'],
								showCancel: false
							});
						}
						
						uni.hideLoading();
			
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

				if (formdata['name'].length < 1) {
					uni.showModal({
						content: '请输入姓名',
						showCancel: false
					});
					return;
				}
				if (formdata['zjhm'].length < 6) {
					uni.showModal({
						content: '请输入证件号码',
						showCancel: false
					});
					return;
				}
				if (formdata['contract'].length < 6) {
					uni.showModal({
						content: '请输入合同编号',
						showCancel: false
					});
					return;
				}
				

				this.requestCount = 0;
				// 回调函数
				this.requestBankVerify(formdata, function(isRequestSucess) {
					console.log(isRequestSucess);
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
				this.xqIndex = e.target.value;
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
		margin-top: 52rpx;
	}
	.tipText{
		width: 100%;
		margin-left: 60rpx;
		align-items: center;
		justify-content: center;
		color: #666666;
		margin-top: 50rpx;
		font-size: 28rpx;
	}
</style>
