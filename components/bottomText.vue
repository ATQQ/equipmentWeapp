<template>
	<view class="bottomText">
		<text class="line">
		</text>
		<text class="content">
			不妨告诉你,我是有底线的
		</text>
		<text class="line">
		</text>
	</view>
</template>

<script>
	export default {
		name:"bottomText",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.bottomText{
		font-size: 0.7rem;
		text-align: center;
		color: #8d8d8d;
		padding-bottom: 0.7rem;
	}
	.line{
		min-width: 50px;
		display: inline-block;
		border-bottom: 1px dashed #8d8d8d;
		vertical-align: middle;
	}
</style>
