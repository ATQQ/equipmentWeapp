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
			/**
			 * 未登录
			 */
			if(!getApp().$vm.$options.isLogin()){
				uni.redirectTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style lang="less">

</style>
