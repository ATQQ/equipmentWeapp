<script>
	export default {
		globalData: {
			text: 'text', //测试数据
			category: null, //分类map
			devices: null, //设备Array
			admin: 'admin', //管理员账号
			baseUrl: null, //服务器路径
			detailId: -1,//设备详情页Id
			orderDetailId:-1,//订单详情页id
			orderList:[],//订单列表数据
			userInfo: {
				userProfession: "舞蹈",
				userAcademy: "艺术院",
				userPhone: null,
				deposit: 0,
				userName: "小天才",
				userNumber: "201731061423",
				userPower: 0
			},
			orderStatus: [], //订单状态map
			eqToken: null
			// eqToken: 'DooyMDNDoyMDE3MzEwNjE0MjM6MTU2NTY5OTE5Mjg4NDow'
		},
		/**
		 * 判断是否登录
		 */
		isLogin: function() {
			return (!!this.globalData.eqToken);
		},
		/**
		 * 判断是否绑定手机
		 */
		isBindPhone: function() {
			return (!!this.globalData.userInfo.userPhone);
		},
		/**
		 * 获取最新设备信息
		 */
		getDevices: function() {
			return new Promise(resolve => {
				uni.request({
					url: this.globalData.baseUrl + 'devices/' + this.globalData.admin,
					method: 'GET',
					data: {},
					success: res => {
						const devices = res.data.data.equipmentList;
						this.globalData.devices = devices;
						console.log('getDevices')
						resolve()
					}
				});
			})
		},
		methods: {
			/**
			 * 获取订单状态Map
			 */
			getOrderStatus: function() {
				this.$options.globalData.orderStatus = new Map([
					[-2, "未通过"],
					[-1, "预约中"],
					[0, "待取"],
					[1, "待归还"],
					[2, "已归还"]
				]);
			},
			/**
			 * 获取分类信息
			 */
			getCategory: function() {
				return new Promise(resolve => {
					uni.request({
						url: this.$baseUrl + 'categorys/' + this.$options.globalData.admin,
						method: 'GET',
						success: res => {
							const categorys = res.data.data.category;
							const map = new Map();
							categorys.forEach((v) => {
								map.set(v.cgId, v.cgName);
							})
							this.$options.globalData.category = map;
							console.log('getCategory')
							resolve();
						}
					});
				})
			}
		},
		onLaunch: async function() {
			this.$options.globalData.baseUrl = this.$baseUrl;
			this.getOrderStatus();
			console.log('App Launch')
			// 网络数据
			await this.getCategory();
		},
		onShow: async function() {
			console.log('App Show')
			await this.$options.getDevices();
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/wxcomponents/vant/common/index.wxss";

	/*每个页面公共css */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
