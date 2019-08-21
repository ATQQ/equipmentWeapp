<template>
	<view class="index">
		<!-- 轮播图 -->
		<swiper :indicator-dots="swiper_config.dots" :autoplay="swiper_config.autoplay" :interval="swiper_config.interval"
		 :duration="swiper_config.duration">
			<swiper-item v-for="(p,index) in imgs" :key="index">
				<view class="swiper-item">
					<image :src="p" mode="aspectFit"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- title -->
		<view class="title">
			<text>{{title}}</text>
		</view>
		<!-- navPanel -->
		<view class="navPanel">
			<view class="navigator-item" v-for="(navItem,index) in navPanel" :key="index" :data-key='navItem.key' @click="redirect($event)">
				<!-- <navigator url="#" > -->
				<image :src="navItem.iconPath" mode="aspectFit"></image>
				<text>{{navItem.text}}</text>
				<!-- </navigator> -->
			</view>
		</view>

		<!-- 分割文字 -->
		<view class="splitWords">
			<text>{{splitWords}}</text>
		</view>
		<!-- 设备列表 -->
		<view class="deviceArea">
			<deviceItem class='deviceItem' v-for="(device,index) in devices" :key="index" :device="device"></deviceItem>
		</view>

		<!-- 换一组 -->
		<view class="changeGroup">
			<text @click="changeDeviceGroup()">点击换一组</text>
		</view>
		<!-- 弹出提示框 -->
		<van-toast id="van-toast" />

	</view>
</template>

<script>
	// 引入toast组件
	import Toast from 'wxcomponents/vant/toast/toast';
	// 设备展示组件
	import {
		deviceItem
	} from '../../components/deviceItem.vue'


	export default {
		data() {
			return {
				count: 4, //首页展示设备个数
				splitWords: '- 设备 -',
				devices: [],
				title: "实验室设备预约系统",
				imgs: [
					"/static/img/p1.jpg",
					"/static/img/p2.jpg",
					"/static/img/p3.jpg"
				],
				swiper_config: {
					'dots': true,
					'autoplay': true,
					'interval': 2000,
					'duration': 1000
				},
				navPanel: [{
						key: 'book',
						iconPath: '/static/icon/预约.png',
						text: '设备预约'
					},
					{
						key: "type",
						iconPath: '/static/icon/分类.png',
						text: '设备分类'
					},
					{
						key: 'vedio',
						iconPath: '/static/icon/帽子.png',
						text: '学习视频'
					}
				]
			}
		},
		methods: {
			changeDeviceGroup: function() {
				this.devices = this.getRandomDevice(this.count);
			},
			// 导航栏
			redirect: function(e) {
				const key = e.currentTarget.dataset.key;
				switch (key) {
					case 'book':
						uni.navigateTo({
							url: '../book/book',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					case 'type':
						uni.navigateTo({
							url: '../type/type',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					case 'vedio':
						Toast({
							type: "fail",
							message: "开发中,敬请期待",
							duration: 1000
						});
						break;
					default:
						break;
				}
			},
			/**
			 * 随机加载{count}个设备信息
			 * @param {Number} count
			 */
			getRandomDevice: function(count) {
				let originDevices = [...getApp().globalData.devices];
				originDevices = originDevices.shuffle();
				return originDevices.length >= count ? originDevices.slice(0, count) : originDevices;
			}
		},
		components: {
			deviceItem
		},
		onLoad: function() {
			// 加载设备列表
			this.changeDeviceGroup()
		}

	}
</script>

<style lang="less" scoped>
	.splitWords,
	.changeGroup {
		text-align: center;
		font-size: 0.7rem;
		color: #5e6265;
	}

	.changeGroup {
		padding-bottom: 0.5rem;
	}

	.deviceArea {
		display: flex;
		flex-direction: column;
		align-items: center;

		.deviceItem {
			margin-top: 0.6rem;
		}

		padding-bottom: 1rem;
	}

	.index {
		background-color: #f0f3f6;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #fff;

		image {
			width: inherit;
			height: inherit;
		}
	}

	.title {
		padding-top: 0.5rem;
		font-size: 0.8rem;
		text-align: center;
	}

	.navPanel {
		background-color: #fff;
		margin: 0.5rem 0.8rem;
		border-radius: 0.4rem;
		display: flex;
		justify-content: space-around;
		height: 4.5rem;
		overflow: hidden;
		padding: 0.3rem;

		.navigator-item {
			width: 25%;
			background-color: transparent;
			width: 100%;
			display: flex;
			flex-direction: column;

			// height: 100%;
			image {
				width: inherit;
				height: 70%;
			}

			text {
				display: inline-block;
				height: 30%;
				width: 100%;
				text-align: center;
				font-size: 0.7rem;
				text-align: center;
			}
		}
	}
</style>
