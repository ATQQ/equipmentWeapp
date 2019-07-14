<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<van-button type="primary">按钮</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello123是是'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		text-align: center;
		height: 400upx;
		p{
			color:red;
		}
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
