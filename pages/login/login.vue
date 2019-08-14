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
			<view>
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
				username: "",
				password: "",
				clearable: true
			};
		},
		methods: {
			login: function() {
				Toast.setDefaultOptions({
					duration: 2000
				})
				var that = this;
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
								const power = res.data.userPower;
								const firstLogin = res.data.firstLogin;
								if (power !== 0) {
									Toast.fail("没有权限")
								} else {
									Toast.success("登录成功");
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
			inputPassword: function(e) {
				this.password = e.detail.value;
			},
			inputUsername: function(e) {
				this.username = e.detail.value;
			}
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
		margin-top: 50upx;
		padding: 15px;

		.btn-item {
			padding-top: 0.8rem;
		}
	}
</style>
