<template>
	<view class="grace-empty">
		<view class="grace-empty-icon"><image class="empty-img" src="../static/empty.png"></image> </view>
		<view class="empty-txt">暂无相关记录</view>
		<view style="margin: 10rpx 50rpx 10rpx 50rpx;">
			<button type="warn" class="grace-button" plain="true" @click="gosee">去逛逛</button>
			
		</view>
		
		<slot></slot>
	</view>
</template>
<script>
export default {
	props: {
		
	},
	
	methods: {
		gosee() {
			
			uni.switchTab({
				url: '../pages/classification/index'
			})
			//	graceJS.navigate('../goodsdetail/goodsdetail' + id);
		},
	
	}
}
</script>
<style>
.grace-empty{width:100%;padding: 80rpx;}
.grace-empty-icon{text-align:center;}
.empty-img{
	width: 225rpx;
	height: 225rpx;
}
.empty-txt{
	font-size: 32rpx;
	color: #8F8F94;
	height: 70rpx;
	line-height: 70rpx;
	text-align: center;
}

</style>