<template name="graceSpeaker">
	<view class="grace-swiper-msg">
		<!--	<view class="m-zx-a">
			<image class="m-zx-img" src="../../static/zx.png"></image>
		</view> -->
		<view class="grace-swiper-msg-icon icon-notificationfill" :style="{color:iconColor}"></view>
		<swiper :vertical="vertical" autoplay="true" circular="true" :interval="interval" :style="{height:height}">
			<swiper-item v-for="(item, index) in msgs" :key="index" :style="{height:height}">
				<navigator :url="item.url" :style="{fontSize:fontSize, fontWeight:fontWeight, color:fontColor, height:height, lineHeight:height}">
					<view class="m-zx-flex">

						<view class="m-zx-b">恭喜</view>
						<view class="m-zx-r">{{item.membername}}</view>
						<view class="m-zx-b">以</view>
						<view class="m-zx-r">￥{{item.finalmoney}}</view>
						<view class="m-zx-b">拍得</view>
						<view class="m-zx-r m-zx-max">{{item.goodname}}</view>
						<view style="margin-left: 10rpx;">
							<image class="m-zx-imga" :src="item.goodlogo"></image>
						</view>
					</view>


				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		name: "graceSpeaker",
		props: {
			msgs: {
				type: Array,
				default: function() {
					return [];
				}
			},
			iconClass: {
				type: String,
				default: ""
			},
			iconColor: {
				type: String,
				default: "#ea0000"
			},
			interval: {
				type: Number,
				default: 3000
			},
			vertical: {
				type: Boolean,
				default: true
			},
			fontSize: {
				type: String,
				default: "24rpx"
			},
			fontColor: {
				type: String,
				default: "#333333"
			},
			fontWeight: {
				type: String,
				default: ""
			},
			height: {
				type: String,
				default: "60rpx"
			}
		}
	}
</script>
<style scoped>
	.grace-swiper-msg {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}

	.grace-swiper-msg-icon {
		margin-right: 16rpx;
		margin-left: 12rpx;
		display: inline-block;
		flex-shrink: 0;
	}

	.grace-swiper-msg swiper {
		width: 100%;
		height: 60rpx;
		overflow: hidden;
	}

	.grace-swiper-msg swiper-item {
		overflow: hidden;
	}

	.grace-swiper-msg navigator {
		line-height: 60rpx;
		overflow: hidden;
	}

	.m-zx-img {
		width: 48rpx;
		height: 48rpx;
	}

	.m-zx-imga {

		width: 50rpx;
		height: 50rpx;
		border-radius: 99rpx;

	}

	.m-zx-a {
		padding: 0 15rpx 0 12rpx;
	}

	.m-zx-flex {
		display: flex;
	}

	.m-zx-b {
		color: #0081FF;
	}

	.m-zx-r {
		color: #ff0000;
	}

	.m-zx-max {
		max-width: 250rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		/*-webkit-text-overflow:ellipsis;*/
		white-space: nowrap;

	}
</style>
