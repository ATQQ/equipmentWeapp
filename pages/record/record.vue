<template>
	<view>
		预约租借记录页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad:function(){
			const token=getApp().globalData.eqToken;
			if(!token){
				uni.redirectTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">

</style>
