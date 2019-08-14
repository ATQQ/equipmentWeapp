<template>
	<view class="deviceDetail">
		<!-- 设备图册区域 -->
		<view class="device-images">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(imgName,index) in ((!device.images||JSON.parse(device.images).length===0)?['demo']:JSON.parse(device.images))"
				 :key='index'>
					<view class="swiper-item">
						<image :src="imgName|getImage" mode="scaleToFill"></image>
					</view>
				</swiper-item>
				<!-- <swiper-item>
					<view class="swiper-item">
						<image src="/static/img/p3.jpg" mode="scaleToFill"></image>
					</view>
				</swiper-item> -->
			</swiper>
		</view>

		<!-- 设备标题区域 -->
		<view class="deviceTitle">
			<text>{{device.eqName}}</text>
		</view>

		<!-- 设备预约量/余量信息 -->
		<view class="deviceCountMsg">
			<view class="msgItem">
				<text class="title">已成功预约人次: </text>
				<text class="number">{{device.numberUse}}</text>
			</view>
			<view class="msgItem">
				<text class="title">设备余量: </text>
				<text class="number">{{device.amount}}</text>
			</view>
		</view>

		<!-- 设备编号 -->
		<view class="introduceCard">
			<view class="title">
				<van-icon class="icon" name="send-gift" /><text>设备编号</text>
			</view>
			<view class="body">
				<text>{{device.eqNumber}}</text>
			</view>
		</view>

		<!-- 设备介绍卡片 -->
		<view class="introduceCard">
			<view class="title">
				<van-icon class="icon" name="comment" /><text>设备介绍</text>
			</view>
			<view class="body">
				<text>{{device.introduce}}</text>
			</view>
		</view>

		<!-- 预约须知 -->
		<view class="introduceCard mb">
			<view class="title">
				<van-icon class="icon" name="info" /><text>预约须知</text>
			</view>
			<view class="body">
				<text>请根据你的需要,进行设备的预约登记</text>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<view class="botNav">
			<view class="left">
				<view class="home" @tap="redirectToHome">
					<van-icon name="wap-home"></van-icon>
					<text>首页</text>
				</view>
			</view>
			<view class="right">
				<view class="book">
					<van-button type="info" size="large" @click="sureBook">立即预约</van-button>
				</view>
			</view>
		</view>

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
				device: {
					eqId: 1,
					eqName: "名称",
					eqNumber: "ddffsfsf",
					categoryId: 3,
					images: '[]',
					introduce: "dsda",
					amount: 12,
					loan: 3,
					numberUse: 555,
					eqAdmin: "admin",
					eqDate: (new Date()) - 0
				}
			};
		},
		methods: {
			/**
			 * 确认预约设备
			 */
			sureBook: function() {
				if (this.device.amount === 0) {
					Toast({
						type: "fail",
						message: "抱歉尚无剩余库存,请换个时间再来看看",
						duration: 2000
					});
				} else {
					uni.navigateTo({
						url: `../confirmOrder/confirmOrder?eqId=${this.device.eqId}`,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			/**
			 * 回到首页
			 */
			redirectToHome:function(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		},
		filters: {
			//获取要展示的图片
			getImage: function(v) {
				if (v === 'demo') {
					return '/static/deviceHead.png'
				}
				return getApp().globalData.baseUrl + 'file/image?picName=' + v;
			}
		},
		onLoad: function() {
			const eqId = getApp().globalData.detailId;
			const devices = getApp().globalData.devices;
			this.device=devices.find(function(item){
				return item.eqId===eqId;
			})
		}
	}
</script>

<style lang="less" scoped>
	// 最后一个元素到底部的距离
	.mb {
		margin-bottom: 60px;
	}

	// 底部导航栏
	.botNav {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-shadow: 0 -1 2px #ddd;
		background-color: #fff;
		height: 50px;

		.left {
			width: 30%;
			display: inline-block;
			height: 50px;

			.home {
				line-height: 50px;
				display: flex;
				flex-direction: column;
				align-items: center;

				van-icon {
					position: relative;
					top: -5px;
					display: block;
					height: 12px;
				}

				text {
					font-size: 0.7rem;
				}
			}
		}

		.right {
			width: 70%;
			height: 100%;
			display: inline-block;
		}

	}

	.deviceDetail {
		background-color: #f4f4f4;
	}

	.deviceTitle {
		background-color: #fff;
		padding: 0.75rem;
		text-align: center;
		word-break: break-all;
		color: #191718;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.deviceCountMsg {
		padding: 0.5rem;
		font-size: 0.7rem;
		background-color: #fff;
		display: flex;
		justify-content: space-around;

		.msgItem {
			color: rgba(0, 0, 0, 0.65);

			.number {
				color: #1989fa;
			}
		}
	}

	.introduceCard {
		margin-top: 0.6rem;
		padding: 0.75rem;
		background-color: #fff;

		.title {
			.icon {
				margin-right: 0.6rem;
			}

			align-content: center;
			align-items: center;
			font-size: 0.7rem;
			color: rgba(0, 0, 0, 0.65);
			font-weight: bold;
		}

		.body {
			padding-top: 0.6rem;
			font-size: 0.8rem;
		}
	}


	@swiperWidth: 100%;
	@swiperHeight: 12rem;

	swiper {
		width: @swiperWidth ;
		height: @swiperHeight ;
	}

	.swiper-item {
		overflow: hidden;
		width: @swiperWidth ;
		height: @swiperHeight ;
		text-align: center;

		image {
			width: @swiperWidth ;
			height: @swiperHeight ;
		}
	}
</style>
