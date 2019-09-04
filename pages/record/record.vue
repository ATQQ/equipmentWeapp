<template>
	<view class="record">
		<!-- 头部标签 -->
		<van-tabs :active="active" @click="changeType" color="#1989fa" animated sticky>
			<van-tab v-for="(status,index) in orderStatus" :title="status.title" :key="index"></van-tab>
		</van-tabs>

		<!-- 订单部分 -->
		<view class="orderArea">
			<orderItem class="orderItem" v-for="(order,index) in OrderList" :order='order' :key="index"></orderItem>
		</view>
		
		<bottomText :text="bottomText" v-show="!IsEmpty"> </bottomText>
		<!-- 空内容提示 -->
		<view class="emptyTips" v-show="IsEmpty">
			<text>空空如也,什么也没有哟,可尝试下拉获取最新数据</text>
		</view>
	</view>
</template>

<script>
	import {orderItem} from '../../components/orderItem.vue';
	import {bottomText} from '../../components/bottomText.vue'

	export default {
		data() {
			return {
				active: 0, //默认选中第一个分类
				orderStatus: [
					{
						num:666,
						title:'全部'
					},
					{
						num:-1,
						title:'预约中'
					},
					{
						num:0,
						title:'待取'
					},
					{
						num:1,
						title:'待归还'
					},
					{
						num:2,
						title:'已归还'
					},
					{
						num:-2,
						title:'未通过'
					}
				], //分类
				orderList:[],
				bottomText:"下拉刷新"
			};
		},
		methods:{
			/**
			 * 获取所属订单列表 
			 */
			getOrderList:function(){
				uni.request({
					url: `${this.$baseUrl}/order/order/${getApp().globalData.userInfo.userNumber}`,
					header:{
						'eq-token':getApp().globalData.eqToken
					},
					method: 'GET',
					success: res => {
						res=res.data;
						if(res.code===200){
							this.orderList=res.data.orders;
							getApp().globalData.orderList=res.data.orders;
							uni.stopPullDownRefresh();
						}
					}
				});
			},
			/**
			 * 分类切换设备数据
			 * @param {Event} e
			 */
			changeType: function(e) {
				this.active=e.detail.index;
			}
		},
		computed:{
			OrderList:function(){
				const orderList=[...this.orderList];
				const {num}= this.orderStatus[this.active];
				if(num===666){
					return orderList.reverse();
				}
				return orderList.filter(v=>{
					return v.orderStatus===num;
				}).reverse()
			},
			IsEmpty:function(){
				return this.OrderList.length===0;
			}
		},
		onLoad:function(){
			/**
			 * 未登录
			 */
			if(!getApp().$vm.$options.isLogin()){
				uni.redirectTo({
					url: '../login/login'
				});
			}else{
				uni.startPullDownRefresh();
				this.getOrderList();
			}
			
		},
		onPullDownRefresh:function(){
			this.getOrderList();
		},
		components:{
			orderItem,
			bottomText
		}
	}
</script>

<style lang="less">
	.record{
		background-color: #f0f3f6;
	}
	.emptyTips {
		font-size: 0.8rem;
		text-align: center;
		position: absolute;
		width: 100%;
		top: 40%;
		color: rgba(0, 0, 0, 0.5);
	}
	.orderArea {
		.orderItem {
			display: block;
			overflow: hidden;
			margin-top: 0.6rem;
			box-shadow: 0 0 2px #ddd;
			background-color: #fff;
		}
		padding-bottom: 1rem;
	}
</style>
