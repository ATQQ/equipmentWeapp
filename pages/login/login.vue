<template>
	<view>
		<!-- <view class="logo">
			<image src="/static/logo.png" mode="scaleToFill"></image>
		</view> -->
		<!-- 标题 -->
		<view class="title">
			<text>
				实验室设备预约系统
			</text>
		</view>
		<!-- 输入部分 -->
		<view class="field">
			<van-cell-group>
				<van-field @blur="inputUsername" :value="username" label="账号" :clearable="clearable" left-icon="user-o" type="number"
				 placeholder="请输入账号" maxlength="12" />
				<van-field @blur="inputPassword" :value="password" label="密码" :clearable="clearable" left-icon="lock" type="password"
				 placeholder="请输入密码" maxlength="16" />
			</van-cell-group>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<view class="rememberBox">
				<van-checkbox :value="rememberPwd" @change="changeRemember">
					记住密码?
				</van-checkbox>
			</view>
			<view class="btn-item">
				<van-button @click="login" type="info" round="true" size="large">登录</van-button>
			</view>
			<view class="btn-item">
				<van-button @click="home" plain type="info" round="true" size="large">首页浏览</van-button>
			</view>
		</view>

		<!-- 弹出提示框 -->
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	// 引入toast组件
	import Toast from 'wxcomponents/vant/toast/toast';

	export default {
		data() {
			return {
				rememberPwd: false,
				username: "",
				password: "",
				clearable: true
			};
		},
		methods: {
			changeRemember: function(e) {
				this.rememberPwd = e.detail;
			},
			/**
			 * 存储用户信息
			 */
			setInfo: function() {
				let copyData ={};
				Object.assign(copyData,this.$data);
				if (!this.rememberPwd) {
					copyData.password = '';
				}
				uni.setStorageSync("userInfo", JSON.stringify(copyData));
			},
			/**
			 * 取出用户信息
			 */
			getInfo: function() {
				const userInfo = uni.getStorageSync("userInfo");
				if (userInfo) {
					Object.assign(this.$data,JSON.parse(userInfo));
				}
			},
			/**
			 * 登录
			 */
			login: function() {
				if(this.username.length!==12){
					Toast.fail("账号格式不正确");
					return;
				}
				if(this.password.length<6||this.password.length>16){
					Toast.fail("密码格式不正确(6-16位)");
					return;
				}
				//存储本地信息
				this.setInfo();
				
				var that = this;
				//登陆请求
				uni.request({
					url: that.$baseUrl + 'user/login',
					method: 'POST',
					data: JSON.stringify({
						userNumber: that.username,
						password: that.password
					}),
					success: res => {
						res = res.data;
						switch (res.code) {
							case 200:
								//解构取值
								const {
									userPower: power,
									firstLogin,
									token
								} = res.data;

								if (power !== 0) {
									Toast.fail("没有权限")
								} else {
									Toast.success("登录成功");
								

									//保存token
									getApp().globalData.eqToken = token;
									//加载用户数据
									that.getUserInfo(that.username, token);

									//判断是否首次登陆给予重置密码权限
									if (firstLogin) {
										uni.navigateTo({
											url: '../firstLogin/firstLogin',
											success: res => {},
											fail: () => {},
											complete: () => {}
										});
									} else {
										uni.switchTab({
											url: '../index/index'
										})
									}
								}

								break;
							case 201:
								Toast.fail("密码错误");
								break;
							case 205:
								Toast.fail("账号不存在");
								break;
							default:
								Toast.fail("登录失败");
								break;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			home: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			/**
			 * 获取个人信息
			 * @param {Number} userNumber
			 * @param {String} token 
			 */
			getUserInfo: function(userNumber, token) {
				console.log("success");
				let that = this;
				uni.request({
					url: that.$baseUrl + `user/user/${userNumber}`,
					method: 'GET',
					header: {
						'eq-token': token
					},
					success: res => {
						res = res.data;
						if (res.code === 200) {
							getApp().globalData.userInfo = res.data.userInfo;
						} else {
							Toast.fail("个人信息获取失败");
						}
					}
				});
			},
			inputPassword: function(e) {
				this.password = e.detail.value;
			},
			inputUsername: function(e) {
				this.username = e.detail.value;
			}
		},
		onLoad:function(){
			Toast.setDefaultOptions({
				duration: 2000
			})
			
			this.getInfo();
		}
	}
</script>

<style lang="scss">
	.logo image {}

	.title {
		padding-top: 15vh;
		text-align: center;
		color: $fw-c-primary;
		font-size: 35upx;
	}

	.field {
		margin-top: 60px;
		padding: 2px 6px;
	}

	.btnArea {
		padding: 15px;

		.btn-item {
			padding-top: 0.8rem;
		}

		.rememberBox {
			display: flex;
			justify-content: center;
			font-size: 0.8rem;
		}
	}
</style>
