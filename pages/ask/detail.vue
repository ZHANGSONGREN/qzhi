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


			<view class="grid col-3 grid-square flex-sub" style="padding-top: 15rpx;">
				<view class="bg-img" v-for="(v,k) in showimgs" :key="k">
					<image :src="v" mode="aspectFill"></image>

				</view>

			</view>

		</view>

		<view style="background-color: #FFFFFF;margin-top: 6rpx;padding-top: 5rpx;padding-bottom: 15rpx;" v-if="item.answer">


			<view class="left-tag">圈主回答</view>
			<view class="an-ta">
				<view>
					<image class="an-imga" :src="host+master.avatar"></image>
				</view>
				<view class="an-tb an-w">

					<text class="an-tb">{{master.qzNickname}}</text>
					<text class="an-tb an-gr">{{item.answerdate}}</text>
				</view>
			</view>

			<view class="left-m" v-html="item.answer">

			</view>
		</view>

		<view style="background-color: #FFFFFF;margin-top: 6rpx;padding-top: 5rpx;padding-bottom: 15rpx" v-if="item.answer&&item.addask">
			<view style="padding: 10rpx;">
				<text style="color: #007AFF;padding-right: 10rpx;">追问</text>
				<text class="" v-html="item.addask"></text>
			</view>
			<view v-if="item.addanswer">
				<view class="left-tag">追问回答</view>
				<view class="left-m" v-html="item.addanswer">

				</view>
			</view>
		</view>



		<view class="d-add">
			<view class="d-add-a" v-if="item.askid==uid&&item.answer&&!item.addask" @click="togglePopup('bottom-share')">追问</view>
			<view class="d-add-a" @click="pl">评论</view>
		</view>

		<view class="cu-card index-card shadow bg-white" style="margin-top:10rpx ;">
			<view class="cu-bar bg-white">
				<view class='action'><text class="icon-titles text-green"></text>评论</view>
			</view>
		</view>

		<view style="display: flex;flex-wrap: wrap;justify-content: center;margin-top:10rpx ;" v-if="comment.length<1">
			<view style="width: 750rpx;text-align: center;">
				<image class="no-img" src="../../static/nodata.png"></image>
			</view>
			<view style="color: #bcbcbc;width: 750rpx;text-align: center;">暂无评论，留下您的精彩评论吧！</view>

		</view>

		<view style="background-color: #FFFFFF;margin: 3rpx;padding: 15rpx 0 15rpx 0;" v-for="(c,index) in comment" :key="index"
		 v-if="comment.length>0">
			<view class="an-ta">
				<view>
					<image class="an-imga" :src="c.wximg"></image>
				</view>
				<view class="an-tb an-w">

					<text class="an-tb text-blue">{{c.wxname}}</text>

					<text class="an-tb " style="margin-top: 10rpx;">{{c.comment}}</text>

					<text class="an-tb an-gr" style="margin-top: 10rpx;">{{c.date}}</text>
				</view>

			</view>


		</view>
		<uni-popup :show="type === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
			<view style="display: block;" class="d-pop">
				<view class="d-popa">
					<view class="d-pop-btn text-gray" @click="togglePopup('')">取消</view>
					<view class="d-pop-btn text-blue" @click="addcomm">确定</view>
				</view>

				<view class="cu-form-group" style="margin:5rpx;">
					<textarea placeholder="请输入追加内容" maxlength='3000' v-model="textare" style="background-color: #f4f4f4;padding: 10rpx;height: 400rpx;line-height: 70rpx;"></textarea>


				</view>
				<view style="min-height: 20rpx;"></view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	var graceJS = require('../../common/grace.js');
	var api = require('../../common/api.js')
	var _self
	export default {
		data() {
			return {
				host: api.host,
				item: [],
				textare: '',
				showimgs: [],
				master: {},
				comment: [],
				uid: api.userid,
				type: '',
				id: 0,

			}
		},
		components: {
			uniPopup
		},
		onBackPress() {
			if (this.type !== '') {
				this.type = '';
				return true;
			}
		},
		onShow() {
			this.getdb(this.id);
		},
		onLoad(option) {
			this.id = option.id;

			this.master = api.mainlist.master;
			console.log(api.askitem, api.userInfo);
			let imgs = api.askitem.showimgs;
			if (!this.showimgs) {
				return false
			};
			let host = api.host;

			graceJS.arrayEach(imgs, (item) => {
				console.log(item);
				this.showimgs.push(host + item);

			});
			console.log(this.showimgs, host, '图片组');


		},
		methods: {
			togglePopup(type) {
				this.type = type;

			},

			pl() {

				uni.navigateTo({
					url: '../ask/comment'
				})



			},

			async addcomment(arr) {
				let db = await api.GET('addask', arr);
				console.log(db, 'DDDD');
				if (db.code == 1) {

					api.msg('操作成功！');
					this.item.addask = this.textare;
					this.togglePopup("");


				}






			},

			addcomm() {
				if (this.textare.length < 3) {
					api.msg('评论不符合要求')
					return false
				};
				let ob = {};
				let da = new Date();
				ob['id'] = this.id;
				ob['addask'] = this.textare;
				ob['date'] = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
				this.addcomment(ob);

			},

			async getdb(id) {

				uni.showLoading && uni.showLoading({
					title: '加载中...'
				});

				let db = await api.GET('getidask', {
					id: id
				});
				console.log(db);
				this.item = db.data;
				if (db.data.comment) {
					this.comment = db.data.comment;
				}

				uni.hideLoading();


			},









		}
	}
</script>

<style>
	page {

		background-color: #f8f8f8;
	}

	.d-pop {
		display: flex;
	}

	.d-popa {
		display: flex;
		justify-content: space-between;
		width: 750rpx;


	}


	.d-pop-btn {
		width: 120rpx;
		text-align: center;
		font-size: 29rpx;

	}

	.d-add {
		width: 160rpx;
		position: fixed;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		bottom: 30rpx;
		right: 10rpx;
		z-index: 999;
	}

	.d-add-a {
		width: 90rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		margin: 5rpx;
		font-size: 28rpx;
		background-color: #e57b1e;
		border-radius: 99rpx;

	}

	.no-img {
		width: 280rpx;
		height: 256rpx;
		margin: 20rpx;
	}

	.left-tag {
		margin: 20rpx 0 20rpx 0;
		width: 180rpx;
		background-color: #5ac274;
		color: #FFFFFF;
		height: 55rpx;
		line-height: 55rpx;
		border-radius: 0 18rpx 18rpx 0;
		text-align: center;

	}

	.left-m {
		margin: 20rpx;
		background-color: #f4f4f4;
		padding: 15rpx;
		border-radius: 8rpx;
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
