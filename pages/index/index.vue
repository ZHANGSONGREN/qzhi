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

			<view class="cu-card index-card shadow bg-white" style="margin-top: 15rpx;padding-top: 10rpx;">
				<view>
					<view class="inext-t1 text-bold">加入须知</view>
					<view class="inext-t1">
						<text style="padding-left: 22rpx;" class="icon-choiceness text-orange">
							<text style="padding: 8rpx;" class="text-black">加入圈子后，你可以在{{stdate}}至{{enddate}}期间，利用微信号登入本圈子查看内容。</text>
						</text>
					</view>

				</view>

				<view class="flex justify-between index-ta" style="margin: 70rpx 5rpx 15rpx 5rpx;">
					<navigator url="" hover-class="none" class="flex-sub">
						<view>
							<text class="text-orange">{{show.totQa}}<text class="text-gray"> 问答</text></text>
						</view>

					</navigator>

					<navigator url="" hover-class="none" class="flex-sub solid-left">
						<view>
							<text class=" text-orange">{{show.totMembers}}<text class="text-gray"> 成员</text></text>
						</view>
					</navigator>
				</view>


			</view>

			<view class="cu-card index-card shadow bg-white" style="margin: 5rpx 0 10rpx 0;padding-bottom: 30rpx;">
				<view class="cu-bar bg-white">
					<view class='action'><text class="icon-titles text-green"></text>精选问答预览</view>

				</view>
				<view>
					<askList :dblist='answer' isgo='false'></askList>
				</view>



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
		<view style="min-height: 200rpx; text-align: center;margin-top: 30rpx;">
			<view class="text-gray text-center" style="width: 750rpx;">加入圈子可查看更多内容</view>
			<view style="color: #191919;text-align: center;padding: 20rpx;width: 750rpx;" @click="oldvip">老用户进入通道》 》</view>
		</view>




		<view class="cu-bar foot" v-if="isshow">
			<view class="inext-btn radius lg bg-green shadow" @click="check">加入圈子 {{amount}}元/年</view>
		</view>
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
			oldvip(){
			  uni.navigateTo({
			      url: 'oldvip'
			  });	
			},
			
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

			addqzhi() {


				uni.login({
					success: (e) => {
						let orderid = api.RndNum(4);
						console.log(orderid);
						_self.saveorder(orderid);
						_self.isshow = false;

						uni.request({
							url: api.host +
								`/addons/epay/index/experience?code=${e.code}&amount=${_self.amount}&type=wechat&orderid=${orderid}`,
							success: (res) => {
								console.log(res);

								if (res.statusCode !== 200) {

									uni.showModal({
										content: "支付失败，请重试！",
										showCancel: false
									});

									return;
								}




								let paymentData = res.data;
								console.log("得到接口prepay_id", paymentData);
								uni.requestPayment({
									timeStamp: paymentData.timeStamp,
									nonceStr: paymentData.nonceStr,
									package: paymentData.package,
									signType: 'MD5',
									paySign: paymentData.paySign,
									success: (res) => {
										_self.saveuser(orderid);


									},
									fail: (res) => {
										//		uni.hideLoading();

										uni.showModal({
											content: "支付失败,原因为:订单被取消 ",
											showCancel: false
										})
									},
									complete: () => {
										_self.isshow = true;
										uni.hideLoading();
										//			this.loading = false;
									}
								})

							},
							fail: (e) => {
								//console.log("fail", e);
								//		this.loading = false;
								_self.isshow = true;
								uni.hideLoading();
								uni.showModal({
									content: "支付失败,原因为:订单被取消 ",
									showCancel: false
								})
							}
						})
					},
					fail: (e) => {
						console.log("fail", e);
						_self.isshow = true;
						//	this.loading = false;
						uni.hideLoading();
						uni.showModal({
							content: "支付失败,原因为:订单被取消 ",
							showCancel: false
						})
					}
				})
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
									_self.addqzhi();
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



			saveuser(orderid) {
				let ar = {};
				ar['wxname'] = this.userInfo['nickName'];
				ar['wximg'] = this.userInfo['avatarUrl'];
				ar['wxid'] = api.userid;
				ar['enddate'] = this.enddatea;
				ar['stdate'] = this.stdatea;
				ar['orderid'] = orderid;
				this.svuer(ar);

			},

			async svuer(arr) {


				let db = await api.GET('saveuser', arr);
				console.log(db);
				if (db.code == 1) {
					graceJS.navigate('/pages/home/index', 'reLaunch');
				} else {
					api.msg(db.msg);
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
		width: 100%;
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
