<template>
	<view>
		<view class="m-add bg-orange shadow" @tap="ask">+ 提问</view>

		<view class="m-head" :style="{backgroundImage: 'url(' + bg_img+ ')', backgroundSize:'contain'}">
			<view class="m-head-ta">
				<image class="m-img shadow bg-white" :src="bg_av"></image>
			</view>
			<view class="m-head-ta  text-bold shadow"> <text class="m-head-tb">{{List.master.qzNickname}}</text>
			</view>

			<view class="m-head-ta icon-message " style="padding: 5rpx;text-align: left;">
				{{List.show.summary}}

			</view>

		</view>

		<view class="bg-white" style="margin: 0 0 2rpx 0;padding: 10rpx;">
			<view class="wz" v-for="t in wzlist" @click="gotoemea(t)">
				<view class="wz-a">置顶</view>
				<view class="wz-b">{{t.title}}</view>
			</view>


		</view>




		<!-- <text class="text-gray "
					 style="padding: 5rpx;"> ▼</text> -->

		<view class="bg-white" style="margin: 2rpx 0 2rpx 0;">
			<view class="cu-bar bg-white">
				<view class='action'><text class="icon-titles text-green margin-right-xs"></text>全部主题 </view>
				<view class="action" @tap="toSearch">
					<view class="search-form round" style="width: 200rpx;" >
						<view class="icon-search"></view>
						<input type="text" placeholder="搜一搜" ></input>
					</view>
				</view>
			</view>
		</view>
		<view>
			<anList :dblist="scrollData"></anList>

		</view>
		<graceLoading :loadingType="loadingType"></graceLoading>


	</view>
</template>

<script>
	import graceLoading from '../../components/graceLoading.vue';
	var graceJS = require('../../common/grace.js');
	var api = require('../../common/api.js')
	var _self
	export default {
		data() {
			return {
				host: api.host,
				List: {
					master: {
						name: ""
					},
					show: {
						summary: ""
					}
				},
				bg_img: '',
				bg_av: '',
				isvip: false,
				uid: '',
				scrollData: [],
				loadingType: 3,
				scrollConfig: {
					url: 'getallask',
					params: {
						wxid: '',
						page: 1
					}
				},
				wzlist: [],
			}
		},
		onShow() {
			//	this.getask(this.scrollConfig);
		},
		components: {
			graceLoading
		},
		onReachBottom: function() {
			//避免多次触发
			if (this.loadingType == 1 || this.loadingType == 2) {
				return;
			}
			this.getask(this.scrollConfig);
			//	console.log(this.scrollConfig, '上拉');
		},
		onLoad() {
			_self = this;

			this.getdb();
		},
		onPullDownRefresh: function() {
			this.scrollConfig.params.page = 1;
			this.getdb();
		},
		methods: {
			gotoemea(t) {
				api.theme = t;
				console.log(t.url);
				if (t.url == null || t.url == '') {
					//	console.log('有内容');
					graceJS.navigate('/pages/home/themea');
				} else {
					//	console.log('无内容');
					graceJS.navigate('/pages/home/themeb');
				}
			},

			toSearch() {
				graceJS.navigate('/pages/ask/query');
			},
			async getdb() {
				// uni.showLoading && uni.showLoading({
				// 	title: '加载中...'
				// });
				this.scrollConfig.params.page = 1;
				let db = await api.GET('gethomedb', {});
				// uni.hideLoading();
				uni.stopPullDownRefresh();
				let tmpobj = db.data;
				let master = tmpobj.master;
				let avatar = api.host + master.avatar;
				api.askconut = tmpobj.show.conut;
				let tmp = tmpobj.answer;
				graceJS.arrayEach(tmp, (item) => {
					item.img = avatar;
					item.name = master.qzNickname;
				});
				this.$set(tmpobj, 'answershow', tmp);
				//	console.log(tmpobj, 'obj');
				this.List = tmpobj;
				this.bg_img = api.host + master.image;
				this.bg_av = api.host + master.avatar;
				api.mainlist = tmpobj;
				let theme = await api.GET('gettheme', {});
				console.log(theme);
				this.wzlist = theme.data;
				this.getcode();
				uni.hideLoading();
			},

			async getmyopenid(code) {
				let db = await api.GET('myopenid', {
					code: code
				});
				api.userid = db.msg;
				let dbvip = await api.GET('isvip', {
					wxid: db.msg
				});

				if (dbvip.code == 1) {
					this.isvip = true;
					this.scrollConfig.params.wxid = db.msg;
					//api.userInfo = dbvip.data[0];
					this.getask(this.scrollConfig);
					//	console.log(this.scrollConfig, dbvip, this.isvip, 'vip');
					return false;

				}
				graceJS.navigate('/pages/index/index', 'reLaunch');
				//this.uid = db.msg;
			},


			async getask(cfg) {
				console.log(cfg, '传入参数');
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

			ask() {
				
				// #ifdef H5
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称
						// console.log(res.userInfo, '用户信息');
						// api.userInfo = res.userInfo;
						graceJS.navigate('/pages/ask/index');
				// #endif
				
				// #ifndef H5
				wx.getSetting({
					success: function(res) {
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success: function(res) {
									console.log(res.userInfo, '用户信息');
									api.userInfo = res.userInfo;
									graceJS.navigate('/pages/ask/index');


								}
							})
						} else {
							console.log('res.userInfo', 'no');
							graceJS.navigate('/pages/my/authb');

						}
					}
				})
				// #endif
				

			},

			getcode() {
				
				// #ifdef H5
				console.log("wxjdk准备好了")
				//获取定位经纬度
				if (this.$wechat && this.$wechat.isWechat()) {
						 this.$wechat.initJssdk(function (res) {
								 console.log(res)
								// let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
								// let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
								// todo
								let latitude = 31.14979;
								let longitude = 121.12426;

								//根据经纬度，解析区域，提示用户输入
						 });
				}
				
				// #endif
				
				// #ifndef H5
				
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						_self.getmyopenid(loginRes.code);
						//console.log(db);
					}
				});
				
				// #endif
			},


		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}

	.wz {
		margin: 20rpx;
		display: flex;
		width: 730rpx;
	}

	.wz-a {
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		width: 65rpx;
		border: 1rpx solid #00aa00;
		color: #00aa00;
		font-size: 28rpx;
	}

	.wz-b {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		width: 650rpx;
		margin-left: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		white-space: nowrap;

	}


	.m-add {
		position: fixed;
		border-radius: 12rpx 0 0 12rpx;

		color: #FFFFFF;
		width: 150rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		bottom: 150rpx;
		right: 0;
		z-index: 999;
	}

	.m-head {
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		height: 320rpx;
		justify-content: center;
		align-items: center;
		padding: 15rpx;

	}

	.m-head-ta {
		width: 710rpx;
		margin: 5rpx;
		text-align: center;
		justify-items: center;
	}

	.m-img {
		width: 128rpx;
		height: 128rpx;
		border-radius: 99rpx;
	}

	.m-head-tb {
		border-radius: 9rpx;

		padding: 8rpx;

	}

	.m-head-tc {
		display: flex;
		flex-wrap: nowrap;
		width: 750rpx;
		background-color: #FFFFFF;

		padding: 20rpx;

	}
</style>
