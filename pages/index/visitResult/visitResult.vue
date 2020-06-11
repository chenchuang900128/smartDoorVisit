<template>
	<view class="content">
		<view class="text">访客二维码</view>
		<view class="canvas">
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
		</view>

		<text class="list-text"> 姓名
		</text>

		<text class="list-text"> 手机号:
		</text>

		<text class="list-text"> 来访人数:
		</text>

		<text class="list-text"> 来访事由:
		</text>

		<text class="list-text"> 来访日期:
		</text>

		<button class="button" type="primary" @tap="shareClick()">微信分享</button>
		<button class="button" type="default" @tap="sendMsgClick()">短信发送</button>
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js'

	export default {
		data() {
			return {
				qrcodeText: 'uQRCode',
				qrcodeSize: 136,
				qrcodeSrc: ''
			}
		},
		onLoad() {
			this.make()
		},
		methods: {
			make() {
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})

				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
						this.qrcodeSrc = res
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			shareClick() {

			},
			sendMsgClick() {

			}
		}
	}
</script>

<style>
	page {
		background-color: #f0f0f0;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: var(--status-bar-height);
	}

	.text {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		font-size: 36rpx;
		height: 44rpx;
		color: #333333;
	}

	.canvas {
		margin-top: 40rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}



	.image {
		width: 272rpx;
		margin-top: 50rpx;
		text-align: center;

	}

	.list-text {
		display: flex;
		justify-content: center;
		width: 100%;
		line-height: 52rpx;
		font-size: 28rpx;
		color: #666666;
	}

	.button {
		width: 88%;
		margin-top: 40rpx;

	}
</style>
