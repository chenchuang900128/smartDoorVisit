<template>
	<view class="content">
		<view class="uni-list" v-if="seen">
			<!-- 分割线 -->
			<view class="lineVTop"></view>
			<!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in visitList" :key="index" @tap="openinfo"
			 :data-newsid="item.visitorId" :data-index="index">


				<view class="list-text">姓名:
					<text class="list-textValue">{{'' + item.name}}
					</text>
					<view class="checkbtnText">{{'查看二维码'}}</view>

				</view>

				<text class="list-text"> 手机号:
					<text class="list-textValue">{{ item.phone + '\n'}}</text>
				</text>

				<text class="list-text"> 来访人数:
					<text class="list-textValue">{{ item.visitingNum + '\n'}}</text>
				</text>

				<text class="list-text"> 来访事由:
					<text class="list-textValue">{{ item.visitingReason + '\n'}}</text>
				</text>


				<text class="list-text"> 来访时间:
					<text class="list-textValue">{{item.visitingTime + '\n'}}</text>
				</text>

				<!-- <text class="list-text"> 退款账号:
					<text class="list-textValue">{{item.yhkh + '\n'}}</text>
				</text> -->



				<!-- 分割线 -->
				<view class="lineV"></view>

			</view>
		</view>
		<view v-if="errViewSeen">
			<image class="logo" src='../../../static/NetworkError@3x.png' mode="aspectFit"></image>
			<view class="errText">{{errMsg}}</view>
		</view>
	</view>
</template>

<script>
	import ALLURL from "@/common/allUrl.js";

	export default {

		data() {
			return {
				myObjData: {},
				visitList: [],
				seen: false,
				errMsg: '暂无数据',
				fwzl: '',
				errViewSeen:false,

			};
		},

		onLoad: function(e) {

			this.myObjData = {
				xm: e.xm,
				zjhm: e.zjhm,
				appKey: e.appKey
			};

			//this.fwzl = ALLURL.ZJValidString(e.fyid);

			if (this.fwzl.length < 1) {

				var that = this;
				this.requestContractInfo({}, function(isRequestSuceess) {

					console.log('回调成功');
					if (isRequestSuceess) {

						that.requestVisitList({}, function(requestSucess) {

						});
					}
				});

			} else {

				this.requestVisitList({}, function(requestSucess) {

				});
			}

		},
		methods: {


			// 请求单位合同信息
			requestCompanyContractInfo: function(formdata, callBack) {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: ALLURL.baseURL + '/zjzl/SK/json/Z027',
					method: 'POST',
					data: {
						zjhm: this.myObjData.zjhm,
						appKey: this.myObjData.appKey,
						name: this.myObjData.xm,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: res => {
						uni.hideLoading();

						var dataDic = res.data;
						console.log("单位合同查询接口调用成功 " + JSON.stringify(dataDic));
						if (Number(dataDic['code']) == 0) {

							this.fwzl = ALLURL.ZJValidString(dataDic['data']['fycode']);
							callBack(true);

						} else {

							this.errViewSeen = true;
							// uni.showModal({
							// 	content: dataDic['msg'],
							// 	showCancel: false
							// });
						}



					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},
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
							callBack(true);
						} else {

							this.requestCompanyContractInfo({}, function(isRequestSuceess) {


								if (isRequestSuceess) {
									callBack(true);

								}
							});


						}




					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},

			// 访客记录
			requestVisitList: function(formdata, callBack) {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: ALLURL.baseURL + ALLURL.KTradeid_visitList,
					method: 'POST',
					data: {
						// 合同保证金信息
						roomKey: this.fwzl,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: res => {
						uni.hideLoading();
						var dataDic = res.data;
						console.log("访客记录接口调用成功 " + JSON.stringify(dataDic));
						if (Number(dataDic['code']) == 0) {

							var jsonArr = dataDic["data"];
							if (jsonArr.length > 0) {

								this.seen = true;
								this.visitList = jsonArr;
								// for (let item of jsonArr) {

								// 	this.visitList.push(item);

								// }
							} else {

							   this.errViewSeen = true;

							}
						} else {

							this.errViewSeen = true;

						}


					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},
			openinfo: function(e) {
				let myIndex = Number(e.currentTarget.dataset.index);
				console.log('点击序列' + JSON.stringify(e.currentTarget));
				uni.navigateTo({

					url: './visitViewQr?requestObj=' + JSON.stringify(this.visitList[myIndex]) + '&qrcodeText=' + e.currentTarget.dataset
						.newsid,
				});
			}

		}
	};
</script>

<style>
	.content {
		flex-direction: column;
		display: flex;
		width: 100%;
		height: 100vh;
	}

	.uni-list {
		margin-top: -16rpx;
	}

	.uni-list-cell {
		flex-direction: column;
		padding-top: 16rpx;
		padding-bottom: -16rpx;
		width: 100%;
		height: auto;
	}

	.lineVTop {
		margin-top: 16rpx;
		height: 1rpx;
		width: 100%;
		background-color: #F1F1F1;
	}

	.lineV {
		margin-top: 16rpx;
		height: 1rpx;
		width: 100%;
		background-color: #F1F1F1;
	}



	.list-text {

		flex-direction: row;
		margin-left: 6%;
		line-height: 52rpx;
		height: 52rpx;
		width: 95%;
		font-size: 26rpx;
		color: #666666;
	}

	.list-textValue {
		margin-left: 24rpx;
		line-height: 52rpx;
		width: 30%;
		font-size: 28rpx;
		color: #333333;
	}

	.checkbtnText {
		margin-left: 77%;
		margin-top: -52rpx;
		width: 142rpx;
		font-size: 26rpx;
		color: #007AFF;
		height: 52rpx;
		border-width: 2rpx;
		border-color: #C0C0C0;
		border-radius: 8rpx;

	}

	
</style>
