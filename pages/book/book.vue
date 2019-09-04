<template>
	<scroll-view class="book" scroll-y="true" :style="deviceHeight" @scrolltolower="scrollLower()">
		<!-- 设备列表 -->
		<view class="deviceArea">
			<deviceItem class='deviceItem' v-for="(device,index) in devices" :key="index" :device="device"></deviceItem>
		</view>

		<!-- 空内容提示 -->
		<view class="emptyTips" v-show="isEmpty">
			<text>空空如也,什么也没有哟</text>
		</view>

		<!-- 页面底部文案 -->
		<bottomText v-show='!loadFlag' :text="bottomText"></bottomText>
		<!-- 弹出提示框 -->
		<van-toast id="van-toast" />
	</scroll-view>
</template>

<script>
	// 设备展示组件
	import {
		deviceItem
	} from '../../components/deviceItem.vue';
	
	import {bottomText} from '../../components/bottomText.vue'
	// 引入toast组件
	import Toast from 'wxcomponents/vant/toast/toast';
	export default {
		data() {
			return {
				devices: [],
				deviceHeight: '',
				isEmpty: false,
				loadFlag:true,//判断是否该触发加载新的内容
				bottomText:"不妨告诉你,我是有底线的"
			}
		},
		methods: {
			/**
			 * 滚动到底部触发
			 */
			scrollLower: function() {
				if(this.loadFlag){
					this.loadNewDevice(2);
				}
			},
			/**
			 * 加载新的设备
			 * @param {Number} count 加载数量
			 */
			loadNewDevice:function(count){
				const orignDevices = getApp().globalData.devices;
				const nowCount=this.devices.length;
				// 满足加载新设备的条件
				if(this.loadFlag&&nowCount<=orignDevices.length){
					this.loadFlag=false;
					this.devices.push(...(orignDevices.slice(nowCount,nowCount+count)));
					this.loadFlag=!(this.devices.length===orignDevices.length);
				}
			}
		},
		onLoad() {
			const orignDevices = getApp().globalData.devices;
			this.isEmpty=orignDevices.length===0;
			this.devices = orignDevices.slice(0, 5);
			// 获取设备高度
			uni.getSystemInfo({
				success: (res) => {
					this.deviceHeight = 'height:' + res.windowHeight + 'px'
				}
			})
		},
		components: {
			deviceItem,
			bottomText
		}
	}
</script>

<style lang="less" scoped>
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
