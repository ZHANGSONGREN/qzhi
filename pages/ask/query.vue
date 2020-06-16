<template>
	<view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input :adjust-position="false" type="text" placeholder="请输入关键字" confirm-type="search" style="padding-left: 20rpx;"
				 v-model="qry"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @click="goqry">搜索</button>
			</view>
		</view>

		<view v-if="scrollData.length<1">

			<view class="cu-card index-card shadow bg-white" style="margin: 5rpx 0 10rpx 0;">
				<view class="cu-bar bg-white">
					<view class='action'><text class="icon-titles text-green"></text>搜索标签</view>

				</view>


			</view>

			<view class="bg-withe" style="margin-top: 5rpx;padding: 20rpx;display: flex;width: 700rpx;flex-wrap: wrap;">
				<view class="v-tags" v-for="t in tags" @click="goqy(t.name)">
					{{t.name}}
				</view>

			</view>

		</view>

		<view style="margin-top: 5rpx;">
			<anList :dblist="scrollData"></anList>
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
				host: api.host,
				tags: [],
				scrollData: [],
				loadingType: 3,
				qry: '',

				scrollConfig: {
					url: 'getqueryask',
					params: {
						wxid: '',
						page: 1,
						key: '',
					}
				},

			}
		},
		onLoad() {
			this.getdb();


		},

		onReachBottom: function() {

			//避免多次触发
			if (this.loadingType == 1 || this.loadingType == 2) {
				return;
			}
			this.getmyask(this.scrollConfig);
			console.log(this.scrollConfig, '上拉');
		},

		methods: {

			goqry() {
				if (this.qry == '' || !this.qry) {
					api.msg('请输入关键字');
					return false
				};
				this.scrollConfig.params.key = this.qry;
				this.scrollConfig.params.page = 1;
				this.getmyask(this.scrollConfig);

			},

			goqy(name) {

				this.scrollConfig.params.key = name;
				this.scrollConfig.params.page = 1;
				this.getmyask(this.scrollConfig);

			},

			async getdb() {
				let db = await api.GET('gettags', {});

				this.tags = db.data;


			},

			async getmyask(cfg) {

				let url = cfg.url;
				let ar = {};
				ar['page'] = cfg.params.page;
				ar['wxid'] = cfg.params.wxid;
				ar['key'] = cfg.params.key;

				let arr = await api.POST(url, ar);
				console.log(arr, ar);

				if (arr.data.data.length < 1) {
					api.msg('没有查找到相应记录');
					return false
				};

				if (cfg.params.page == 1) {
					this.loadingType = 3
					this.scrollData = [];
				}
				let curPageData = arr.data.data;

				if (arr.data.current_page == arr.data.last_page) {
					this.loadingType = 2;
				} else {
					this.scrollConfig.params.page = arr.data.current_page + 1;
				}

				this.scrollData = this.scrollData.concat(curPageData);
				console.log(this.scrollData, this.scrollConfig, '记录数');





			},









		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}

	.v-tags {
		padding: 0rpx 15rpx 0rpx 15rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 20rpx;
		background-color: #ff7a52;
		color: #FFFFFF;
		border-radius: 8rpx;
		text-align: center;
	}
</style>
