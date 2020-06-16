<template>
	<view>

		<view class="a-main">
			<view class="auth-item" style="margin-top: 50rpx;">请同意授予以下权限：</view>
			<view class="auth-item">获取你的公开信息（头像、昵称等）</view>
			<view style="margin-top: 50rpx;">
				<button open-type="getUserInfo" hover-class='none' @getuserinfo="getUserInfoFun" class="btn bg-orange">确定授权</button>
				<button @click="exit" class="btn bg-orange">返回首页</button>
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
		font-size: 32rpx;
	}



	.btn {

		margin: 25rpx;
		width: 400rpx;

		color: #FFFFFF;
		border-radius: 12rpx;
	}
</style>
