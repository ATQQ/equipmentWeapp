<template>
	<view>
		<!-- 头部标签 -->
		<van-tabs :active="active" @click="changeType" color="#1989fa">
			<van-tab v-for="(category,index) in categorys" :title="category.name" :key="index"></van-tab>
		</van-tabs>
		<!-- 设备列表 -->
		<view class="deviceArea">
			<deviceItem class='deviceItem' v-for="(device,index) in devices" :key="index" :device="device"></deviceItem>
		</view>

		<!-- 空内容提示 -->
		<view class="emptyTips" v-show="isEmpty">
			<text>空空如也,什么也没有哟</text>
		</view>
	</view>
</template>

<script>
	// 设备展示组件
	import {
		deviceItem
	} from '../../components/deviceItem.vue';

	export default {
		data() {
			return {
				active: 0, //默认选中第一个分类
				categorys: [], //分类
				devices: [],
				isEmpty: false
			};
		},
		methods: {
			/**
			 * 分类切换设备数据
			 * @param {Event} e
			 */
			changeType: function(e) {
				const id = this.categorys[e.detail.index].id;
				this.loadDevicesByCategory(id);
			},
			/**
			 * 加载分类数据
			 */
			loadCategorys: function() {
				const categorys = getApp().globalData.category;
				let t = [];
				categorys.forEach((v, k) => {
					t.push({
						id: k,
						name: v
					})
				})
				this.categorys = t;
			},
			/**
			 * 加载指定分类的设备数据
			 * @param {Object} category
			 */
			loadDevicesByCategory: function(category) {
				const orignDevices = getApp().globalData.devices;

				this.devices = orignDevices.filter((v) => {
					return v.categoryId === category;
				})
				// 是否显示空目录提示
				this.isEmpty = this.devices ? this.devices.length === 0 : true;
			}
		},
		onLoad: function() {
			this.loadCategorys();
			this.loadDevicesByCategory(this.categorys[this.active].id);
		},
		components: {
			deviceItem
		}
	}
</script>

<style lang="less">
	.emptyTips {
		font-size: 0.8rem;
		text-align: center;
		position: absolute;
		width: 100%;
		top: 40%;
		color: rgba(0, 0, 0, 0.5);
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
</style>
