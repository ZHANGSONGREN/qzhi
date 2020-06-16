<template>
	<view>
		<view style="background-color: #FFFFFF;padding: 20rpx;">
			<view class="an-ta">
				<view>
					<image class="an-imga" :src="item.ishideswitch==1||!item.askav?'../../static/user.png':item.askav"></image>
				</view>
				<view class="an-tb an-w">
					<text class="an-tb" v-if="item.ishideswitch==1">匿名</text>
					<text class="an-tb" v-else>{{item.askname}}</text>
					<text class="an-tb an-gr">{{item.date}}</text>
				</view>
			</view>
			<view class="an-ta">
				<view>
					<image v-if="item.askimages" src="../../static/img.png" class="an-imgb"></image>
				</view>
				<view style="width: 680rpx;margin-left: 15rpx;" v-html="item.ask"></view>

			</view>

			<view class="cu-form-group align-start">
				<textarea placeholder="请输入评论" maxlength='3000' v-model="textare" style="background-color: #f4f4f4;padding: 10rpx;height: 460rpx;line-height: 70rpx;"></textarea>

			</view>

			<view class="c-btn radius lg bg-green shadow" @click="add">发送</view>
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
				item: api.askitem,
				textare: '',

			}
		},
		onLoad() {
			//	console.log(this.item, api.userInfo);


		},
		methods: {

			async addcomment(arr) {
				let db = await api.GET('addcomment', arr);
				api.msg('评论成功');
				uni.navigateBack();





			},

			add() {
				if (this.textare.length < 3) {
					api.msg('评论不符合要求')
					return false
				};
				let da = new Date();



				let ob = {};
				ob['askid'] = this.item.id;
				ob['wxid'] = api.userid;
				ob['wxname'] = api.userInfo['nickName'];
				ob['wximg'] = api.userInfo['avatarUrl'];
				ob['comment'] = this.textare;
				ob['date'] = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
				this.addcomment(ob);

			}








		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}

	.c-btn {

		margin: 20rpx;
		padding: 20rpx;
		text-align: center;

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
</style>
