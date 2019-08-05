<template>
	<view>
		设备预约界面
		<!-- 弹出提示框 -->
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	// 引入toast组件
	import Toast from 'wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		beforeCreate: () => {
			Toast.loading({
				mask: true,
				message: '加载中...'
			});
		},
		created:()=>{
			Toast.clear();
		}
	}
</script>

<style type="less" scoped>

</style>
