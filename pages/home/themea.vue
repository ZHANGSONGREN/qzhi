<template>
	<view>
		<view style="margin: 10rpx;">
			<view style="padding:10rpx;font-size: 32rpx;font-weight: 700;text-align: center;margin: 10rpx;">{{list.title}}</view>
			<view style="padding:10rpx;font-size: 29rpx;" v-html="list.content">{{list.post_title}}</view>
		</view>
	</view>
</template>

<script>
	var graceJS = require('../../common/grace.js');
	var api = require('../../common/api.js')
	var _self
	export default {
		data() {
			return {
				list: {},

			}
		},
		onLoad() {
			this.list = api.theme;


		},
		methods: {










		}
	}
</script>

<style>
	page {

		background-color: #FFFFFF;
	}
</style>
