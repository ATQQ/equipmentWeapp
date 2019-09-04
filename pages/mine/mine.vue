<template>
	<view>
	我的个人页面	
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
			// if(!getApp().$vm.$options.isLogin()){
			// 	uni.redirectTo({
			// 		url: '../login/login'
			// 	});
			// }
		}
	}
</script>

<style lang="less">

</style>
