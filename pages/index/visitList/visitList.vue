<template>
	<view class="content" > 
		<view class="uni-list" v-if="seen">
			<!-- 分割线 -->
			<view class="lineVTop"></view>
			<!-- 自定义了一个data-id的属性,可以通过js获取到它的值!  hover-class 指定按下去的样式类-->
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in refundList" :key="index" @tap="openinfo"
			 :data-newsid="item.htbh">

				<text class="list-text"> 姓名:
					<text class="list-textValue">{{ item.xm + '\n'}}</text>
				</text>

				<text class="list-text"> 证件号码:
					<text class="list-textValue">{{ item.zjhm + '\n'}}</text>
				</text>

				<text class="list-text"> 合同编号:
					<text class="list-textValue">{{ item.htbh + '\n'}}</text>
				</text>

				<text class="list-text"> 保证金金额:
					<text class="list-textValue">{{(item.sjbzje) + '\n'}}</text>
				</text>

				<text class="list-text"> 退款银行:
					<text class="list-textValue">{{item.yhmc + '\n'}}</text>
				</text>

				<text class="list-text"> 退款账号:
					<text class="list-textValue">{{item.yhkh + '\n'}}</text>
				</text>

				<text class="list-text"> 退款状态:
					<text class="list-textValue">{{ (item.bzjjnzt=='3')?'已退款':'退款中' + '\n'}}</text>
				</text>

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
				fwzl:'',
			};
		},

		onLoad: function(e) {

			
			this.myObjData = {
				xm: e.xm,
				zjhm: e.zjhm,
				appKey: e.appKey
			};

			
			this.requestContractInfo({}, function(isRequestSuceess) {
					
					if(isRequestSuceess){
						
						this.requestVisitList();
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
					url:    ALLURL.baseURL + '/zjzl/a/info/zjLogin/GIHSSContQuery',
					method: 'POST',
					data: {
						zjhm:this.myObjData.zjhm,
						appKey:this.myObjData.appKey
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: res => {
						uni.hideLoading();
						
						var dataDic = res.data;
						console.log("退保证金接口调用成功 " + dataDic);
						if (Number(dataDic['code']) == 0) {
							
							this.fwzl =  ALLURL.ZJValidString(dataDic['data']['fwzl']);
							callBack(true);
						}
						else{
							
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
			openinfo:function(e){
				
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
						var dataDic = res.data.data;
						console.log("访客记录接口调用成功 " + dataDic);
						if (Number(res.data['code']) == 0) {

							var jsonArr = dataDic["dataList"];
							if (jsonArr.length > 0) {

								this.seen = true;
								for (let item of jsonArr) {
									if (item['bzjzt'] !== "1") {

										this.refundList.push(item);

									}

								}
							}
							if(this.refundList.length < 1){
								
								this.errMsg =  '暂无数据';
								
							}
						} else {
						
						   this.errMsg =  res.data['msg'];
							
						}


					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {}
				});
			},

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
		width:  100%;
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
		width: 100%;
		font-size: 28rpx;
		color: #333333;
	}
	.errText{
		
		width: 100vw;
		height: 44rpx;
		margin-top: 46vh;
		text-align: center;
		
	}
</style>
