<template>
	<view>

		<view class="an-main" v-for="(item,index) in dbl" :key="index" @tap="toDetail(item,index)">
			<view class="an-ta">
				<view>
					<image class="an-imga" :src="item.ishideswitch==1||!item.askav?'../static/user.png':item.askav"></image>
				</view>
				<view class="an-tb an-w">
					<text class="an-tb" v-if="item.ishideswitch==1">匿名</text>
					<text class="an-tb" v-else>{{item.askname}}</text>
					<text class="an-tb an-gr">{{item.date}}</text>
				</view>
			</view>

			<view class="an-ta" style="padding-left: 20rpx;">

				<view class="s-jga">
					<!--	<view>
									<image v-if="item.askimages" src="../static/img.png" class="an-imgb"></image>
								</view> -->
					<view class="m-jj m-gray" style="width: 680rpx;margin-left: 15rpx;" v-html="item.con"></view>
				</view>
			</view>

			<view class="ask-wait shadow" v-if="!item.answer&&isshow=='B'">
				<text class="icon-time"></text>
				<text style="margin-left: 20rpx;">等待回答中</text>

			</view>
			<view style="padding: 10rpx 10rpx 10rpx 40rpx;color:#FF9700 ;" v-if="item.amount>0">感谢打赏，您的问题会被优先回答</view>

			<view style="margin: 50rpx 0 30rpx 0">
				<view v-if="item.answer" class="m-jj p" style="margin: 20rpx;" v-html="item.answer">
				</view>

			</view>

			<!--	<view v-if="item.answer">
							<view class="cu-chat">
								<view class="cu-item">
									<view class="main">
										<view class="content bg-green shadow flex justify-between">
											<text class="icon-read"></text> <text style="width: 260rpx; text-align: right;">阅读回答</text>
										</view>
									</view>
			
								</view>
							</view>
						</view> -->

			<view class="flex justify-between index-ta" style="margin: 10rpx">
				<!--	<view style="width: 240rpx;text-align: center;" class="flex-sub">
			
								<text class="text-gray icon-attentionfavor">{{item.see}}</text>
			
			
							</view> -->

				<view style="width: 240rpx;text-align: center;" class="flex-sub ">

					<text class="icon-appreciate" :class="item.myzan==1?'text-red':'text-gray'" @click.stop="zan(item)">
						{{item.laud}}</text>


				</view>

				<view style="width: 240rpx;text-align: center;" class="flex-sub solid-left" @click.stop="pl(item)">

					<text class="text-gray icon-mark ">{{item.comment.length}}</text>


				</view>


			</view>







		</view>



	</view>

</template>

<script>
	var graceJS = require('@/common/grace.js');
	var api = require('@/common/api.js')
	var _self
	export default {
		data() {
			return {
				dbl: []
			}
		},

		props: {
			dblist: {
				type: Array,
				default: () => []
			},

			isshow: {
				type: String,
				default: 'A'
			},




		},

		watch: {
			dblist: function(val) {
				this.dbl = val;
				graceJS.arrayEach(this.dbl, (item) => {
					item.img = api.host + api.mainlist.master.avatar;
					item.asknamea = api.mainlist.master.qzNickname;
					if (item.amount > 0) {
						item.con = '打赏 ' + '<span style="color:#FF9700">' + '￥' + item.amount + '</span>' + ' 提问：' +
							'<span style="color:#757575">' + item.ask + '</span>';
					} else {
						item.con = '提问：' + '<span style="color:#757575">' + item.ask + '</span>';

					};




				});

				console.log(this.dbl, 'xxxxx');



			}
		},



		methods: {

			zan(item, index) {
				let ob = {};
				ob['wxid'] = api.userid;
				ob['askid'] = item.id;
				if (item.myzan == 1) {
					item.myzan = 0;
				} else {
					item.myzan = 1;
				};
				this.setzan(ob);





			},

			pl(item, index) {
				api.askitem = item;
				uni.navigateTo({
					url: '../ask/comment'
				})



			},

			async setzan(ar) {
				let arr = await api.POST('zan', ar);
				console.log(arr, ar);
			},


			toDetail(item) {
				api.askitem = item;
				uni.navigateTo({
					url: '../ask/detail?id=' + item.id
				})
				//	graceJS.navigate('../goodsdetail/goodsdetail' + id);
			},

		}

	}
</script>

<style>
	.an-main {
		width: 750rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		margin-bottom: 10rpx;

	}

	.m-jj {
		letter-spacing: 3rpx;
		line-height: 41rpx;
	}

	.s-jga {

		width: 5rpx;
		border: 1rpx solid #e7e7e7;
		border-width: 0 0 0 5rpx;

	}

	.ask-wait {
		width: 338rpx;
		margin: 20rpx 20rpx 35rpx 20rpx;
		background-color: #e1e1e1;
		height: 70rpx;
		line-height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.an-ta {
		display: flex;
		margin-bottom: 10rpx;

	}

	.an-w {
		flex-wrap: wrap;

	}

	.an-nw {
		flex-wrap: nowrap;
	}

	.an-imga {
		width: 72rpx;
		height: 72rpx;
		margin: 5rpx 15rpx 5rpx 15rpx;
		border-radius: 99rpx;
	}

	.an-imgb {
		width: 36rpx;
		height: 36rpx;
		margin: 5rpx 1rpx 5rpx 15rpx;
	}

	.an-tb {
		width: 660rpx;
		display: flex;



	}

	.an-gr {
		font-size: 27rpx;
		color: #c8c8c8;
	}

	.p {
		position: relative;
		max-width: 660rpx;
		background-color: #fff;
		padding: 20rpx 25rpx;
		font-size: 29rpx;
		border-radius: 8rpx;
		box-shadow: 0 3rpx 28rpx rgba(0, 0, 0, 0.1), 3rpx 3rpx rgba(0, 0, 0, 0.1);
	}

	.p::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		bottom: 99%;

		left: 56rpx;
		border: 28rpx solid transparent;
		border-top: none;
		border-bottom-color: #ffff;
		-webkit-filter: drop-shadow(0 0 3rpx 3rpx rgba(0, 0, 0, 0.1));
		filter: drop-shadow(0 0 3rpx 3rpx rgba(0, 0, 0, 0.1));
	}
</style>
