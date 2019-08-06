<template>
	<view class="device-Item">
		<!-- 头部 -->
		<view class="device-header">
			<!-- 图片 -->
			<view class="device-img">
				<image :src="device.images|showImage|getImage" mode="scaleToFill"></image>
			</view>
			<view class="device-title">
				<text class="deviceName">{{device.eqName}}</text>
				<text class="deviceNumber">编号:{{device.eqNumber}}</text>
			</view>
		</view>
		<!-- 底部 -->
		<view class="device-footer">
			<view class="top">
				<view class="tips">
					<text class="tip">
						{{device.categoryId|getCategory}}
					</text>
				</view>
				<view class="checkBtn">
					<button type="default" @click="checkDetail(device.eqId)">设备详情</button>
				</view>
			</view>
			<view class="bottom">
				<text>借出次数: {{device.numberUse}}</text>
				<text>可借: {{device.amount}}</text>
				<text>图片: {{device.images|imageCount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "deviceItem",
		data() {
			return {
				
			};
		},
		props:{
			device:{
				eqId:Number,
				eqName:String,
				eqNumber:String,
				categoryId:Number,
				images:Array,
				introduce:String,
				amount:Number,
				loan:Number,
				numberUse:Number,
				eqAdmin:String,
				eqDate:Number
			}
		},
		filters:{
			// 展示的图片名称
			showImage:function(v){
				const imgs=JSON.parse(v);
				return imgs.length?imgs[0]:'demo';
			},
			//获取要展示的图片
			getImage:function(v){
				if(v==='demo'){
					return '/static/deviceHead.png'
				}
				return getApp().globalData.baseUrl+'file/image?picName='+v;
			},
			// 图片个数
			imageCount:function(v){
				return JSON.parse(v).length;
			},
			// 获取分类名称
			getCategory:function(v){
				return (getApp().globalData.category.get(v));
			}
		},
		methods:{
			checkDetail:function(id){
				// 物品详情页面
				console.log(id);
			}
		}
	}
</script>

<style lang="less" scoped>	
	.device-Item {
		width: 92vw;
		border-radius: 0.4rem;
		box-shadow: 0 1px 2px #ddd;
		background-color: #fff;
		position: relative;
	}

	.device-header {
		padding: 0.5rem;
		position: relative;
		background-color: rgba(57, 169, 237, 0.1);

		.device-img {
			position: absolute;
			border: 1px solid #fff;
			box-shadow: 0 0 0.2rem #fff;
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 50%;
			overflow: hidden;
			background-color: transparent;

			image {
				width: inherit;
				height: inherit;
			}
		}

		.device-title {
			display: flex;
			flex-direction: column;
			margin-left: 5rem;
			line-height: 2;

			.deviceName {
				font-size: 0.8rem;
				font-weight: bold;
				color: rgba(102, 198, 242, 1);
			}

			.deviceNumber {
				font-size: 0.6rem;
				color: rgba(0, 0, 0, 0.6);
				font-weight: bold;
			}
		}
	}

	.device-footer{
		padding: 0.5rem;
		position:relative;
		.top{
			overflow: hidden;
			.tips{
				display: inline-block;
				.tip{
					padding: 0.5rem;
					font-size: 0.6rem;
					background-color: rgba(236, 236, 236,1);
					border-radius: 0.8rem;
					color: rgba(141, 141, 141,1);
				}
			}
			.checkBtn{
				display: inline-block;
				float: right;
				button{
					background-color: rgba(102, 198, 242, 0.8);
					font-size: 0.7rem;
					color: #fff;
					border-radius: 0.8rem;
					font-weight: bold;
				}
			}
		}
		.bottom{
			overflow: hidden;
			padding: 0.5rem;
			display: flex;
			justify-content: space-around;
			color: rgba(141, 141, 141,1);
			font-size: 0.6rem;
		}
	}
</style>
