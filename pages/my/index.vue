<template>
	<view>
		<view class="my-head">
			<view class="my-nk">
				<image class="my-au" :src="au"></image>
			</view>
			<view class="my-nk">{{nk}}</view>
			<view style="min-height: 30rpx;"></view>

		</view>
		
		<view class="cu-card index-card shadow bg-white" style="margin: 5rpx 0 10rpx 0;">
			<view class="cu-bar bg-white">
				<view class='action'><text class="icon-titles text-green"></text>我的提问</view>
		
			</view>
			
		
		
		</view>



		<view style="display: flex;flex-wrap: wrap;justify-content: center;margin:20rpx;" v-if="scrollData.length<1">
			<view style="width: 750rpx;text-align: center;">
				<image class="no-img" src="../../static/nodata.png"></image>
			</view>
			<view style="color: #bcbcbc;width: 750rpx;text-align: center;">暂无提问</view>

		</view>
		
		


		<view class="my-con">
          

			<anListb :dblist="scrollData" :isshow='B'></anListb>

			<!--	<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="indexc==TabCur?'text-orange cur':''" v-for="(itemc,indexc) in tabs" :key="indexc"
					 @tap="tabSelect" :data-id="indexc">
						{{itemc}}
					</view>
				</view>
			</scroll-view> -->

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
				B: 'B',
				au: '',
				nk: '',
				TabCur: 0,
				scrollData: [],
				loadingType: 3,

				tabs: ['我提问的', '我看过的'],
				scrollConfig: {
					url: 'getmyask',
					params: {
						wxid: '',
						page: 1
					}
				},
			}
		},
		onShow() {
			wx.getSetting({
				success: function(res) {
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称
						wx.getUserInfo({
							success: function(res) {
								console.log(res.userInfo);
								_self.au = res.userInfo['avatarUrl'];
								_self.nk = res.userInfo['nickName'];
								_self.scrollData = [];
								_self.getmyask(_self.scrollConfig);

							}
						})
					} else {
						console.log('res.userInfo', 'no');
						graceJS.navigate('/pages/my/authb');

					}
				}
			})

		},

		onLoad() {
			_self = this;
			this.scrollConfig.params.wxid = api.userid;





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



			async getmyask(cfg) {

				let url = cfg.url;
				let ar = {};
				ar['page'] = cfg.params.page;
				ar['wxid'] = cfg.params.wxid;

				let arr = await api.POST(url, ar);
				console.log(arr, ar);

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

			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.TabCur);

			},








		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}

	.no-img {
		width: 280rpx;
		height: 256rpx;
		margin: 20rpx;
	}

	.my-head {
		width: 750rpx;
		height: 230rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: #5ac274;
		padding-bottom: 30rpx;


	}

	.my-con {

		background-color: #FFFFFF;
		box-shadow: #09BB07;

	}

	.my-au {
		width: 150rpx;
		height: 150rpx;
		background-color: #FFFFFF;
		border-radius: 99rpx;
	}

	.my-nk {

		width: 750rpx;
		color: #FFFFFF;
		text-align: center;
		padding-top: 44rpx;
	}
</style>
