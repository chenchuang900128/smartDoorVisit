<template>
	<view class="content">
		<view class="uni-list" v-if="seen">
			<!-- 分割线 -->
			<view class="lineVTop"></view>
			<!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in refundList" :key="index" @tap="openinfo"
			 :data-newsid="item.htbh">


				<text class="list-text"> 姓名:
					<text class="list-textValue">{{'' + item.xm}}
					</text>
					<text class="checkbtnText">{{'查看详情' + '\n'}}</text>

				</text>

				<text class="list-text"> 来访人数:
					<text class="list-textValue">{{ item.zjhm + '\n'}}</text>
				</text>

				<text class="list-text"> 来访事由:
					<text class="list-textValue">{{ item.htbh + '\n'}}</text>
				</text>

				<text class="list-text"> 来访原因:
					<text class="list-textValue">{{(item.sjbzje) + '\n'}}</text>
				</text>

				<text class="list-text"> 来访时间:
					<text class="list-textValue">{{item.yhmc + '\n'}}</text>
				</text>

				<!-- <text class="list-text"> 退款账号:
					<text class="list-textValue">{{item.yhkh + '\n'}}</text>
				</text> -->



				<!-- 分割线 -->
				<view class="lineV"></view>

			</view>
		</view>
		<text class="errText">{{errMsg}}</text>
	</view>
</template>

<script>
	import ALLURL from "@/common/allUrl.js";

	export default {

		data() {
			return {
				myObjData: {},
				refundList: [],
				seen: false,
				errMsg: '',
				fwzl: '',
			};
		},

		onLoad: function(e) {


			this.myObjData = {
				xm: e.xm,
				zjhm: e.zjhm,
				appKey: e.appKey
			};
			this.myObjData = {
				xm: '陈创',
				zjhm: '430423199001281412',
				appKey: 'fe8c09cb3d927e839930849f22e60263'
			};

			var that = this;
			this.requestContractInfo({}, function(isRequestSuceess) {

				console.log('回调成功');
				if (isRequestSuceess) {

					that.requestVisitList({}, function(requestSucess) {

					});
				}
			});
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
							callBack(true);
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
						if (Number(res.data['code']) == 0) {

							var jsonArr = dataDic["data"];
							if (jsonArr.length > 0) {

								this.seen = true;
								for (let item of jsonArr) {

									this.refundList.push(item);


								}
							}
							if (this.refundList.length < 1) {

								this.errMsg = '暂无数据';

							}
						} else {

							this.errMsg = res.data['msg'];

						}


					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},
			openinfo: function(e) {


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
		margin-left: 40rpx;
		line-height: 52rpx;
		width: 100%;
		font-size: 26rpx;
		color: #666666;
	}

	.list-textValue {
		margin-left: 24rpx;
		line-height: 54rpx;
		width: 30%;
		font-size: 28rpx;
		color: #333333;
	}

	.checkbtnText {
		margin-left: 50%;
		margin-right: 30rpx;
		line-height: 54rpx;
		width: 20%;
		font-size: 26rpx;
		color: #007AFF;
	}

	.errText {

		width: 100vw;
		height: 44rpx;
		margin-top: 46vh;
		text-align: center;

	}
</style>
