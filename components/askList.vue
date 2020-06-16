<template>
	<view>

		<view class="s-maina" v-for="(item,index) in dblist" :key="index" @tap="isgo?toDetail(item.id):''">
			<view class="s-main">
				<view class="s-jg"></view>
			</view>
			<view class="s-main">
				<view class="s-ta-a">
					<view class="s-ta-ab">
						<image class="s-ta-imgb" src="../static/hg.png"></image>
					</view>
					<view class="s-ta-ab" style="margin-top: -10rpx;">
						<image class="s-ta-img" :src="item.img"></image>
					</view>

				</view>
				<view class="s-ta-b">
					<view class="s-ta-bb text-orange">{{item.name}}</view>
					<view class="s-ta-bb text-gray text-sm">{{item.date}}</view>
					<view class="s-ta-bb s-max s-jga ">
						<view style="padding-left: 10rpx;">

							<view class="text-gray text-sma" v-html="item.askname+'提问:'+item.ask"></view>
						</view>

					</view>
					<view class="s-ta-bb s-maxa margin-top-xs" v-html="item.answer"> </view>

				</view>
			</view>

		</view>



	</view>

</template>

<script>
	var api = require('@/common/api.js')
	var _self
	export default {
		data() {
			return {


			}
		},

		props: {
			dblist: {
				type: Array,
				default: () => []
			},

			isgo: {
				type: Boolean,
				default: true
			},


		},

		watch: {

		},



		methods: {


			toDetail(id) {
				console.log(id);
				uni.navigateTo({
					url: '../goodsdetail/goodsdetail?id=' + id
				})
				//	graceJS.navigate('../goodsdetail/goodsdetail' + id);
			},

		}

	}
</script>

<style>
	.s-jg {
		min-height: 2rpx;
		background-color: #e3e3e3;
		min-width: 680rpx;
		margin: 5rpx 5rpx 10rpx 5rpx;

	}

	.s-jga {

		width: 5rpx;
		border: 1rpx solid #e7e7e7;
		border-width: 0 0 0 5rpx;

	}

	.s-main {
		margin-top: 10rpx;
		width: 660rpx;
		display: flex;

	}

	.s-maina {

		width: 660rpx;
		display: flex;
		flex-wrap: wrap;

	}

	.s-ta {
		width: 660rpx;
		display: flex;


	}

	.s-ta-a {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		flex-wrap: wrap;
		justify-items: center;
		align-items: center;
		margin: 5rpx 15rpx 5rpx 15rpx;

	}

	.s-ta-ab {
		width: 100rpx;
		text-align: center;


	}

	.s-ta-img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 99rpx;

	}

	.s-ta-imgb {
		width: 25rpx;
		height: 22rpx;


	}

	.s-ta-b {
		width: 550rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.s-ta-bb {
		width: 550rpx;
		padding: 5rpx 0rpx 5rpx 5rpx;

	}

	.s-max {
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		letter-spacing: 3rpx;
		line-height: 41rpx;
	}

	.s-maxa {
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 10;
		-webkit-box-orient: vertical;
		overflow: hidden;
		letter-spacing: 3rpx;
		line-height: 41rpx;
	}
</style>
