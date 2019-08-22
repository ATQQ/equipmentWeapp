<template>
	<!-- 订单Card -->
	<van-card @tap="checkDetail(order.orderId)" class="van-card" :num="order.orderLendDays" :thumb="Device.images|getImageName|getImageUrl">
		<!-- 标题部分 -->
		<view slot="title" class="title">
			<!-- 设备名称 -->
			<text class="name">{{Device.eqName}}</text>
			<!-- 订单状态 -->
			<text class="status">{{order.orderStatus|getOrderStatus}}</text>
		</view>
		<!-- 设备描述 -->
		<view slot="desc">{{Device.introduce}}</view>
		<view slot="tags" class="tags">
			<!-- 设备分类 -->
			<van-tag plain type="primary" size="medium">{{Device.categoryId|getCategoryName}}</van-tag>
		</view>
		<!-- 底部部分 -->
		<view slot="footer" class="footer">
			<!-- 订单开始日期 -->
			<text>开始时间:{{order.orderStart|getDate}}</text>
			<!-- 订单结束日期 -->
			<text>租借天数:{{order.orderLendDays}}</text>
		</view>

	</van-card>

</template>

<script>
	export default {
		name: 'orderItem',
		data() {
			return {

			};
		},
		methods:{
			checkDetail:function(id){
				// 跳转订单详情页面
				getApp().globalData.orderDetailId=id;
				uni.navigateTo({
					url: '../orderDetail/orderDetail'
				});
			}
		},
		props: {
			order: {
				orderId: Number,
				orderNumber: String,
				eqId: Number,
				orderStart: Date,
				orderEnd: Date,
				orderLendDays: Number,
				number: Number,
				userNumber: String,
				orderStatus: Number
			}
		},
		computed: {
			Device: function() {
				const device = getApp().globalData.devices.find(v => v.eqId === this.order.eqId);
				return device;
			}
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

<style lang="less">
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
