<template>
	<view class="bottomText">
		<text class="line">
		</text>
		<text class="content">
			{{text}}
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
		},
		props:{
			text:String
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
