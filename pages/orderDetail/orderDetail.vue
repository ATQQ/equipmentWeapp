<template>
	<view>
		<!-- 设备展示 -->
		<view>
			<van-card @tap="checkDeviceDetail(order.eqId)" :num="order.orderLendDays" :thumb="device.images|getImageName|getImageUrl">
				<!-- 标题部分 -->
				<view slot="title" class="title">
					<!-- 设备名称 -->
					<text class="name">{{device.eqName}}</text>
					<!-- 订单状态 -->
					<text class="status">{{order.orderStatus|getOrderStatus}}</text>
				</view>
				<!-- 设备描述 -->
				<view slot="desc">{{device.introduce}}</view>
				<view slot="tags" class="tags">
					<!-- 设备分类 -->
					<van-tag plain type="primary" size="medium">{{device.categoryId|getCategoryName}}</van-tag>
				</view>
			</van-card>
		</view>
		<!-- 信息确认 -->
		<van-cell-group>
			<van-field disabled :value="order.orderStatus|getOrderStatus" label="状态" left-icon="info-o" border />
			<van-field disabled :value="order.number" label="数量" left-icon="circle" border />
			<van-field disabled :value="order.orderLendDays" label="预约天数" left-icon="clock-o" border />
			<van-field disabled :value="order.orderStart|getDate" label="开始时间" left-icon="calender-o" border />
			<van-field disabled :value="order.orderEnd|getDate" label="结束时间" left-icon="calender-o" border />
			<van-field disabled :value="device.eqNumber" label="设备编号" left-icon="star-o" border />
			<van-field disabled :value="order.orderNumber" label="订单编号" left-icon="like-o" border />

		</van-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {
					orderId: 2,
					orderNumber: 3,
					eqId: 3,
					orderStart: new Date(),
					orderEnd: new Date(),
					orderLendDays: 666,
					number: 666,
					userNumber: 666,
					orderStatus: -1
				},
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
				},

			};
		},
		methods: {
			checkDeviceDetail: function(id) {
				// 跳转订单详情页面
				getApp().globalData.detailId = id;
				uni.navigateTo({
					url: '../deviceDetail/deviceDetail'
				});
			},
			getDevice: function() {
				return new Promise(resolve => {
					const {
						eqId
					} = this.order;
					this.device = getApp().globalData.devices.find(v => {
						return v.eqId === eqId;
					})
					resolve();
				})
			},
			getOrder: function() {
				return new Promise(resolve => {
					const {
						orderDetailId
					} = getApp().globalData;
					this.order = getApp().globalData.orderList.find(v => {
						return v.orderId === orderDetailId;
					})
					resolve()
				})

			},
			initPage: async function() {
				await this.getOrder();
				await this.getDevice();
			}
		},
		onLoad: function() {
			this.initPage()
		},
		filters: {
			/**
			 * 获取分类名称
			 * @param {Number} categoryId
			 */
			getCategoryName: function(categoryId) {
				return getApp().globalData.category.get(categoryId)
			},
			/**
			 * 获取要展示的图片名称
			 * @param {Object} images 图片json数组
			 */
			getImageName: function(images) {
				if (!images) return 'demo'
				const imgs = JSON.parse(images);
				return imgs.length ? imgs[0] : 'demo';
			},
			/**
			 * 获取图片url
			 * @param {String} imageName 图片名称
			 */
			getImageUrl: function(imageName) {
				if (imageName === 'demo') {
					return '/static/deviceHead.png'
				}
				return getApp().globalData.baseUrl + 'file/image?picName=' + imageName;
			},
			/**
			 * 获取时间
			 * @param {Number} dateNumber 时间
			 */
			getDate: function(dateNumber) {
				if (!dateNumber) return '';
				const date = new Date(dateNumber);
				return date.Format('yyyy-MM-dd hh:mm:ss');
			},
			/**
			 * 获取订单状态
			 * @param {Object} statusCode 订单状态码
			 */
			getOrderStatus: function(statusCode) {
				return getApp().globalData.orderStatus.get(statusCode);
			}
		}
	}
</script>

<style lang="less" scoped>
	.title {
		.name {
			display: inline-block;
			font-weight: bold;
			font-size: 0.9rem;
		}

		.status {
			display: inline-block;
			float: right;
			color: #1989fa;
		}
	}

	.tags {
		padding: 0.5rem;
	}

	.footer {
		display: flex;
		color: rgba(0, 0, 0, 0.5);
		justify-content: space-around;
	}
</style>
