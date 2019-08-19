<template>
	<view class="confirm-order">

		<!-- 设备展示 -->
		<view>
			<van-card :num="eqCount" :tag="device.categoryId|getCategoryName" :desc="device.introduce" :title="device.eqName"
			 :thumb="device.images|getImageUrl">
				<view slot="footer">
					<van-stepper :value="eqCount" integer='true' min="1" :max="device.amount" step="1" @change="nowCount" />
				</view>
			</van-card>
		</view>

		<!-- 信息确认 -->
		<van-cell-group>
			<picker mode="selector" :range="daysRange" @change="orderDaysChange">
				<view>
					<van-field disabled placeholder="点击选择租借天数" :value="daysIndex===-1?'':daysRange[daysIndex]" label="租借天数" left-icon="clock-o"
					 border />
				</view>
			</picker>
			<van-field disabled :value="userInfo.userName" label="姓名" left-icon="user-o" placeholder="姓名" border />

			<van-field disabled :value="userInfo.userNumber" label="工号" left-icon="gift-card-o" placeholder="工号" border />

			<van-field disabled :value="userInfo.userPhone" type="number" left-icon="phone-o" label="手机号" placeholder="手机号"
			 border />
		</van-cell-group>
		<!-- 底部提交订单 -->
		<van-submit-bar @submit="submitOrder" decimal-length='0' label="数量" :price="eqCount|transferCount" buttonType="info"
		 currency=' ' suffix-label="个" button-text="提交申请" :tip="true">
			<view slot="tip">
				提交后申请后,请随时关注 <text>预约的状态</text>
			</view>
		</van-submit-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				device: {
					categoryId: 1,
					eqName: '设备名称',
					introduce: '设备介绍',
					amount: 3,
					images: '[]'
				},
				daysRange: [1, 2, 3],
				daysIndex: -1,
				eqCount: 1, //租借的设备数量
				userInfo: { //用户信息
					userName: "读取中.",
					userNumber: "读取中..",
					userPhone: "读取中..."
				}
			};
		},
		onLoad: function(e) {
			this.createDaysRange(30);
			const eqId = getApp().globalData.detailId;
			this.getDevice(eqId);
			this.getUserInfo();
		},
		methods: {
			submitOrder: function() {
				// console.log("提交订单");
				// 如果还未选择天数
				if(this.daysIndex===-1){
					uni.showToast({
						icon:'none',
						title:'请选择预约的天数'
					})
					return;
				}
				
				let that = this;
				
				uni.request({
					url: that.$baseUrl + 'order/add',
					method: 'POST',
					data: JSON.stringify({
						"eqId": that.device.eqId,
						"orderLendDays": that.daysRange[that.daysIndex],
						"number": that.eqCount,
						"userNumber": that.userInfo.userNumber
					}),
					success: res => {
						res=res.data;
						//刷新设备数据
						that.device.amount-=that.eqCount;
						getApp().$vm.$options.getDevices();
						
						uni.showToast({
							title: '预约成功',
							icon: 'success',
							duration:2000,
							complete: () => {
								setTimeout(function(){
									uni.navigateBack({
										delta: 1
									});
								},2000)
							}
						});
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			/**
			 * 获取用户信息
			 */
			getUserInfo: function() {
				this.userInfo = getApp().globalData.userInfo
			},
			/**
			 * 加载设备信息
			 * @param {Number} eqId
			 */
			getDevice: function(eqId) {
				const devices = getApp().globalData.devices;
				this.device = devices.find(function(item){
					return item.eqId===eqId;
				})
			},
			/**
			 * 获取设备当前设备的预约数量
			 * @param {Object} e
			 */
			nowCount: function(e) {
				this.eqCount = e.detail;
			},
			/**
			 * 租借天数
			 */
			orderDaysChange: function(e) {
				this.daysIndex = e.detail.value;
			},
			/**
			 * 生成天数范围
			 * @param {Number} max 最大天数
			 */
			createDaysRange: function(max) {
				let daysRange = [];
				let i = max;
				while (i) {
					daysRange.unshift(i);
					i--;
				}
				this.daysRange = daysRange;
			}
		},
		filters: {
			/**
			 * 转换设备数量数据便于插件显示
			 * @param {Number} v
			 */
			transferCount: function(v) {
				return 100 * v;
			},
			/**
			 * 获取分类名程
			 * @param {Number} categoryId
			 */
			getCategoryName: function(categoryId) {
				return (getApp().globalData.category.get(categoryId))
			},
			/**
			 * 获取图片
			 * @param {String} images
			 */
			getImageUrl: function(images) {
				const imgs = JSON.parse(images);
				return imgs.length ? getApp().globalData.baseUrl + `file/image?picName=${imgs[0]}` : '/static/deviceHead.png';
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
