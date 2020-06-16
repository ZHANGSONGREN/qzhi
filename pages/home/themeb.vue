<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	var graceJS = require('../../common/grace.js');
	var api = require('../../common/api.js')
	var _self
	export default {
		data() {
			return {
				url: ''

			}
		},
		onLoad() {
			let th = api.theme;
			this.url = th.url;


		},
		methods: {



		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}
</style>
