<template>
	<view>
		<view class="index-main">
			<view class="index-avatar shadow">
				<image class="index-img" :src="avatar"></image>
			</view>

			<view class="cu-card index-card shadow bg-white" style="padding-bottom: 70rpx;">
				<view class="index-ta" style="min-height: 60rpx;"></view>
				<view class="index-ta">{{master.qzNickname}}
					<text style="margin-left: 15rpx;padding: 8rpx;font-size: 24rpx;" class="bg-orange text-white radius">{{master.title}}</text>
				</view>


				<view class="inext-t1">
					<text style="padding: 8rpx;">{{show.summary}}</text>
				</view>



			</view>








		</view>


		<view style="margin: 20rpx;">
			<view style="margin: 25rpx;color: #424242;font-size: 32rpx;">输入邀请码加入圈子</view>
			<view style="margin: 30rpx;">
				<input class="uni-input" v-model="code" />
			</view>
			<view style="margin: 10rpx;color: #424242;">
				<view class="inext-btn radius lg bg-green shadow" @click="check">填好了</view>

			</view>
		</view>


		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="bottom-c">
				<button open-type="getUserInfo" @getuserinfo="getUserInfoFun" class="btn">
					<text class="icon-weixin"></text>
					<text style="padding-left: 20rpx;">微信登录</text>
				</button>

				<button @click="exit" class="btn">
					暂不登录
				</button>
			</view>

		</uni-popup>





	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup.vue"
	var graceJS = require('../../common/grace.js');
	var api = require('../../common/api.js')
	var _self
	export default {
		data() {
			return {
				host: api.host,
				master: {},
				show: {},
				avatar: '',
				stdate: '',
				enddate: '',
				stdatea: '',
				enddatea: '',
				answer: [],
				userInfo: {},
				uid: '',
				amount: 0,
				isshow: true,
				code: '',

			}
		},
		components: {
			uniPopup
		},
		onLoad() {
			_self = this;


			this.getdate();




		},

		onShow() {

		},
		methods: {
			exit() {
				_self.isshow = true;
				this.$refs.popup.close();
			},

			open() {
				this.$refs.popup.open();
				this.isshow = false;
			},


			getdate() {
				this.master = api.mainlist.master;
				this.show = api.mainlist.show;
				this.answer = api.mainlist.answershow;
				this.avatar = api.host + this.master.avatar;
				this.amount = api.mainlist.show.vip;

				let da = new Date();
				this.stdate = da.getFullYear() + '年' + (da.getMonth() + 1) + '月' + da.getDate() + '日';
				this.enddate = (da.getFullYear() + 1) + '年' + (da.getMonth() + 1) + '月' + da.getDate() + '日';
				this.stdatea = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
				this.enddatea = (da.getFullYear() + 1) + '-' + (da.getMonth() + 1) + '-' + da.getDate();
			},



			check() {
				wx.getSetting({
					success: function(res) {
						if (res.authSetting['scope.userInfo']) {

							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success: function(res) {
									console.log(res, 'xxxxx');
									_self.userInfo = res.userInfo;
									_self.isok();
									return false;
								}
							})
						} else {
							_self.isshow = false;
							_self.$refs.popup.open();

						}
					}
				});

			},

			getUserInfoFun: function(e) {
				console.log(e.detail.userInfo);

				if (e.detail.userInfo) {
					api.userInfo = e.detail.userInfo;
					this.check();

					//用户按了允许授权按钮
				} else {
					_self.isshow = true;
					this.$refs.popup.close();
					return false

				}
			},



			isok() {
				if (this.code.length != 8) {
					api.msg('邀请码格式不正确');
					return false
				};

				let ar = {};
				ar['wxname'] = this.userInfo['nickName'];
				ar['wximg'] = this.userInfo['avatarUrl'];
				ar['wxid'] = api.userid;
				ar['enddate'] = this.enddatea;
				ar['stdate'] = this.stdatea;
				ar['code'] = this.code;
				this.svuer(ar);

			},

			async svuer(arr) {


				let db = await api.GET('saveuserb', arr);
				console.log(db);
				if (db.code == 1) {
					graceJS.navigate('/pages/home/index', 'reLaunch');
				} else {
					api.Modal()(db.msg);
					return false
				}
			},

			async saveorder(orderid) {
				let ar = {};
				ar['wxname'] = this.userInfo['nickName'];
				ar['wximg'] = this.userInfo['avatarUrl'];
				ar['wxid'] = api.userid;
				ar['orderid'] = orderid;
				ar['type'] = 0;


				let db = await api.GET('saveorder', ar);
				console.log(db, '完成');

			},





		},



	}
</script>

<style>
	page {
		//background: linear-gradient(top left, #fafafa, #c9fe96);
		background-color: #f8f8f8;
	}

	.uni-input {
		border: 1rpx solid #1f1f1f;
		border-radius: 8rpx;
		padding-left: 10rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FFFFFF;
	}

	.bottom-c {
		width: 750rpx;
		display: flex;
		padding: 30rpx;
		justify-content: center;
		background-color: #FFFFFF;
		border-radius: 12rpx 12rpx 0 0;

	}

	.inext-t1 {
		height: 55rpx;
		line-height: 55rpx;
		padding-left: 20rpx;


	}

	.btn {

		margin: 25rpx;
		width: 500rpx;
		border: 1rpx solid #5ac274;
		color: #5ac274;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}

	.inext-btn {

		margin: 20rpx;
		padding: 20rpx;
		text-align: center;

	}

	.navHead {
		position: relative;
		margin: 25rpx;
		padding: 30upx 0;
		display: flex;
		text-align: center;
		border-radius: 10upx;
	}

	.index-main {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.index-card {
		margin: -55rpx 25rpx 5rpx 25rpx;
		width: 700rpx;
		display: flex;
		flex-wrap: wrap;
		border-radius: 12rpx;

	}

	.index-img {
		width: 135rpx;
		height: 135rpx;
		border-radius: 99rpx;
	}

	.index-ta {
		width: 700rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;

	}

	.index-tb {
		width: 700rpx;
		padding: 20rpx;


	}

	.index-avatar {
		width: 135rpx;
		height: 135rpx;
		border-radius: 99rpx;
		background-color: #f9f9f9;
		left: 300rpx;
		z-index: 99;
	}
</style>
