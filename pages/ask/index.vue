<template>
	<view>
		<view class="cu-form-group align-start">

			<textarea placeholder="详细的描述您要询问的问题,包括地区·楼盘·金额等,以便更好的回答" maxlength='3000' v-model="textare" style="background-color: #f4f4f4;padding: 10rpx;height: 460rpx;line-height: 70rpx;"></textarea>

		</view>

		<view class="cu-form-group">
			<view class="grid col-3 grid-square flex-sub" style="padding-top: 15rpx;">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='icon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='icon-cameraadd'></text>
				</view>
			</view>
		</view>

		<view class="cu-form-group">
			<view class="title">匿名提问</view>
			<switch class='orange radius' @change="SwitchD" :class="switchD?'checked':''" :checked="switchD?true:false"></switch>
		</view>

		<view class="cu-card index-card shadow bg-white" style="margin: 5rpx 0 -10rpx 0;">
			<view class="cu-bar bg-white">
				<view class='action'><text class="icon-titles text-green"></text>打赏金额</view>
			</view>
		</view>
		<view class="ds">
			<view :class="indexc==TabCur?'ds-a':'ds-b'" v-for="(itemc,indexc) in tabs" :key="indexc" @tap="tabSelect($event,itemc.value)"
			 :data-id="indexc">
				{{itemc.name}}
			</view>
		</view>

		<view class="cu-bar foot">
			<view class="inext-btn radius lg bg-green shadow" @click="addake">问题写好了</view>
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
				amount: 0,
				host: api.host,
				imgList: [],
				switchD: false,
				textare: '',
				TabCur: 0,
				up: '',
				tabs: [{
					id: 1,
					value: 0,
					name: "无"
				}, {
					id: 2,
					value: 18,
					name: "￥18"
				}, {
					id: 3,
					value: 88,
					name: "￥88"
				}, {
					id: 3,
					value: 188,
					name: "￥188"
				}],

			}
		},
		onLoad() {
			_self = this;
			console.log(api.userInfo);


		},
		methods: {

			ChooseImage() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {

				this.imgList.splice(e.currentTarget.dataset.index, 1)

			},

			SwitchD(e) {
				this.switchD = e.detail.value
			},

			addake() {
				let au = '';
				let nk = '';
				if (this.textare.length < 3) {
					api.msg('提问不符合要求')
					return false
				};


				let da = new Date();

				let arr = {};
				arr['date'] = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
				arr['askid'] = api.userid;
				arr['askname'] = api.userInfo['nickName'];
				arr['askav'] = api.userInfo['avatarUrl'];
				arr['ask'] = this.textare;
				arr['amount'] = this.amount;
				if (this.switchD) {
					arr['ishideswitch'] = 1;
				} else {
					arr['ishideswitch'] = 0
				};

				console.log(arr, '提交 DB');

				if (this.amount == 0) {
					//检验次数


					let co = api.GET('check', {
						wxid: api.userid
					});
					co.then(
						res => {
							console.log(res);
							if (res.code == 0) {
								api.Modal(res.msg);
								return false;
							} else {
								this.uploadImg(arr);
								return false;
							};

						});

					return false

				};


				uni.login({
					success: (e) => {
						let orderid = api.RndNum(4);
						console.log(orderid);
						_self.saveorder(orderid);


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
										_self.uploadImg(arr);

									},
									fail: (res) => {
										//		uni.hideLoading();
										uni.showModal({
											content: "支付失败,原因为:订单被取消 ",
											showCancel: false
										})
									},
									complete: () => {
										uni.hideLoading();
										//			this.loading = false;
									}
								})

							},
							fail: (e) => {
								//console.log("fail", e);
								//		this.loading = false;
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
						//	this.loading = false;
						uni.hideLoading();
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				})







				//	this.saveask(arr);


			},

			async saveorder(orderid) {
				let ar = {};
				ar['wxid'] = api.userid;
				ar['wxname'] = api.userInfo['nickName'];
				ar['wximg'] = api.userInfo['avatarUrl'];
				ar['orderid'] = orderid;
				ar['type'] = 1;


				let db = await api.GET('saveorder', ar);
				console.log(db, '完成');

			},




			async uploadImg(arr) {
				console.log(this.imgList);
				let arrimg = api.delobj(this.imgList);

				let uploadedImgs = await api.localImgs2webImgs(arrimg);
				// 使用上传成功之后的在线图片
				this.up = uploadedImgs.join(",");
				console.log(this.up);
				arr['askimages'] = this.up;

				let db = await api.GET('saveask', arr);
				if (db.code == 1) {
					api.Modal('提交成功');
					uni.navigateBack();
				}
			},

			tabSelect(e, v) {
				this.TabCur = e.currentTarget.dataset.id;

				this.amount = v;
				console.log(this.amount);
			},






		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}

	.inext-btn {
		width: 100%;
		margin: 20rpx;
		padding: 20rpx;
		text-align: center;

	}

	.ds {
		padding: 20rpx;
		display: flex;
		width: 750rpx;
		background-color: #FFFFFF;
	}

	.ds-a {
		margin: 10rpx;
		height: 55rpx;
		line-height: 55rpx;
		text-align: center;
		width: 110rpx;
		border: 1rpx solid #5ac274;
		color: #5ac274;
		font-size: 29rpx;
	}

	.ds-b {
		margin: 10rpx;
		height: 55rpx;
		line-height: 55rpx;
		text-align: center;
		width: 110rpx;
		border: 1rpx solid #d9d9d9;
		color: #d9d9d9;
		font-size: 29rpx;
	}
</style>
