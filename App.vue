<script>
	export default {
		globalData: {
			text: 'text', //测试数据
			category: null, //分类map
			devices: null, //设备Array
			admin: 'admin', //管理员账号
			baseUrl: null, //服务器路径
			detailId: -1,
			userInfo: {
				userProfession: "舞蹈",
				userAcademy: "艺术院",
				userPhone: null,
				deposit: 0,
				userName: "小天才",
				userNumber: "201731061423",
				userPower: 0
			},
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
			var that = this;
			uni.request({
				url: that.globalData.baseUrl + 'devices/' + that.globalData.admin,
				method: 'GET',
				data: {},
				success: res => {
					const devices = res.data.data.equipmentList;
					this.globalData.devices = devices;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			/**
			 * 获取分类信息
			 */
			getCategory: function() {
				var that = this;
				uni.request({
					url: that.$baseUrl + 'categorys/' + that.$options.globalData.admin,
					method: 'GET',
					success: res => {
						const categorys = res.data.data.category;
						const map = new Map();
						categorys.forEach((v) => {
							map.set(v.cgId, v.cgName);
						})
						this.$options.globalData.category = map;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLaunch: function() {
			this.$options.globalData.baseUrl = this.$baseUrl;
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// 测试数据
			// 获取分类列表
			const categorys = [{
					cgId: 1,
					cgName: "测试1"
				},
				{
					cgId: 2,
					cgName: "测试2"
				}, {
					cgId: 3,
					cgName: "测试3"
				}, {
					cgId: 4,
					cgName: "测试4"
				}
			]
			const map = new Map();
			categorys.forEach((v) => {
				map.set(v.cgId, v.cgName);
			})
			this.$options.globalData.category = map;

			const devices = [{
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
				{
					eqId: 2,
					eqName: "名称2",
					eqNumber: "ddfdfsfsf",
					categoryId: 2,
					images: '[]',
					introduce: "dsssda",
					amount: 15,
					loan: 1,
					numberUse: 222,
					eqAdmin: "admin",
					eqDate: (new Date()) - 0
				}
			]
			this.$options.globalData.devices = devices;


			// 网络数据
			this.getCategory();
			this.$options.getDevices();

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
