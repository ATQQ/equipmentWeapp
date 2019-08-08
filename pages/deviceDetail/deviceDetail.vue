<template>
	<view class="deviceDetail">
		<!-- 设备图册区域 -->
		<view class="device-images">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/img/p3.jpg" mode="scaleToFill"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="/static/img/p3.jpg" mode="scaleToFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 设备标题区域 -->
		<view class="deviceTitle">
			<text>设备名称颠三倒四第三设备名称颠三倒四第三方付滴滴滴方付滴滴滴</text>
		</view>

		<!-- 设备预约量/余量信息 -->
		<view class="deviceCountMsg">
			<view class="msgItem">
				<text class="title">已成功预约人次: </text>
				<text class="number">666</text>
			</view>
			<view class="msgItem">
				<text class="title">设备余量: </text>
				<text class="number">12</text>
			</view>
		</view>

		<!-- 设备编号 -->
		<view class="introduceCard">
			<view class="title">
				<van-icon class="icon" name="send-gift" /><text>设备编号</text>
			</view>
			<view class="body">
				<text>ddadddd</text>
			</view>
		</view>
		
		<!-- 设备介绍卡片 -->
		<view class="introduceCard">
			<view class="title">
				<van-icon class="icon" name="comment" /><text>设备介绍</text>
			</view>
			<view class="body">
				<text>正文介绍</text>
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
				<view class="home">
					<van-icon name="wap-home"></van-icon>
					<text>首页</text>
				</view>
			</view>
			<view class="right">
				<view class="book">
					<van-button type="info" size="large">立即预约</van-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
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
