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

		<!-- 设备 -->
		<view class="deviceArea">
			<deviceItem :device="device"></deviceItem>
		</view>
		<!-- 弹出提示框 -->
		<van-toast id="van-toast" />
		

	</view>
</template>

<script>
	// 引入toast组件
	import Toast from 'wxcomponents/vant/toast/toast';
	import {deviceItem} from '../../components/deviceItem.vue'
	export default {
		data() {
			return {
				title: "实验室设备预约系统",
				device:{
					eqId:1,
					eqName:"名称",
					eqNumber:"ddffsfsf",
					categoryId:3,
					images:'[]',
					introduce:"dsda",
					amount:12,
					loan:3,
					numberUse:555,
					eqAdmin:"admin",
					eqDate:(new Date())-0
				},
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
		onLoad() {

		},
		methods: {
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
			}
		},
		components:{
			deviceItem
		}
	}
</script>

<style lang="less" scoped>
	.deviceArea{
		display: flex;
		flex-direction: column;
		align-items: center;
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
