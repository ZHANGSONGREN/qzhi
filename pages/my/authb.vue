<template>
	<view>

		<view class="a-main">
			<view class="auth-item" style="margin-top: 60rpx;">您需要登录后才能进行下一步操作</view>

			<view style="margin-top: 30rpx;">
				<button open-type="getUserInfo" @getuserinfo="getUserInfoFun" class="btn">
					<text class="icon-weixin"></text>
					<text style="padding-left: 20rpx;">微信登录</text>
				</button>
				
				<button  @click="exit" class="btn">
					暂不登录
				</button>
				<!--	<button @click="exit" class="btn bg-orange">返回首页</button> -->
			</view>
		</view>


	</view>
</template>

<script>
	var _self;

	var api = require('../../common/api.js')
	export default {

		onLoad() {
			_self = this;

		},

		methods: {

			exit() {
				uni.reLaunch({
					url: "../home/index"
				});
			},

			getUserInfoFun: function(e) {
				console.log(e.detail.userInfo);

				if (e.detail.userInfo) {
					api.userInfo = e.detail.userInfo;
					uni.navigateBack();

					//用户按了允许授权按钮
				} else {
					return false

				}
			},

		}




	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.a-main {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.auth-item {
		width: 750rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 20rpx;
		font-size: 31rpx;
		
	}



	.btn {

		margin: 25rpx;
		width: 500rpx;
		border: 1rpx solid #5ac274;
		color: #5ac274;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}
</style>
