<template>
	<view>
		
	</view>
</template>

<script>
	var graceJS = require('../../common/grace.js');
	var api = require('../../common/api.js')
	var _self
	export default {
		data() {
			return {
				host: api.host,
				
			}
		},
		onLoad() {
			this.getdb();
		

		},
		methods: {

			async getdb() {
				let db = await api.GET('gethomedb', {});

				




			},

			

				




		}
	}
</script>

<style>
	page {
		
		background-color: #f8f8f8;
	}

	
</style>
