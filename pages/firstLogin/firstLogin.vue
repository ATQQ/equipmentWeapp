<template>
	<view>
		<!-- <view class="logo">
			<image src="/static/logo.png" mode="scaleToFill"></image>
		</view> -->
		<!-- 标题 -->
		<view class="title">
			<text>
				首次登录,请修改密码
			</text>
		</view>
		<!-- 输入部分 -->
		<view class="field">
			<van-cell-group>
				<van-field @blur="inputPwd1" :value="pwd1" label="密码" :clearable="clearable" left-icon="lock" type="password"
				 placeholder="请输入密码" maxlength="16" />
				<van-field @blur="inputPwd2" :value="pwd2" label="密码" :clearable="clearable" left-icon="lock" type="password"
				 placeholder="请再次输入密码" maxlength="16" />
			</van-cell-group>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<view>
				<van-button @click="sureReset" type="info" round="true" size="large">确认重置</van-button>
			</view>
			<view class="btn-item">
				<van-button @click="home" plain type="info" round="true" size="large">暂不修改</van-button>
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
				pwd1: "",
				pwd2: "",
				clearable: true
			};
		},
		methods: {
			/**
			 * 重置密码
			 */
			sureReset: function() {
				let that = this;
				// 取得输入的内容
				const {
					pwd1,
					pwd2
				} = this.$data;
				// 判断输入内容是否合法
				if (pwd1.length < 6 || pwd1.length > 16) {
					Toast.fail("密码长度不正确(6-16位)");
					return;
				}
				if (pwd1 !== pwd2) {
					Toast.fail("两次输入的密码不一致");
					return;
				}

				const {
					eqToken
				} = getApp().globalData;
				const {
					userNumber
				} = getApp().globalData.userInfo;
				//发送请求更改密码
				uni.request({
					url: that.$baseUrl + `user/userinfo/${userNumber}`,
					method: 'PUT',
					header: {
						"eq-token": eqToken
					},
					data: JSON.stringify({
						password: pwd1,
						firstLogin:0
					}),
					success: res => {
						res = res.data;
						if (res.code === 200) {
							Toast.success("重置成功");
							uni.switchTab({
								url: '../index/index'
							})
						}
						if (res.code === 201) {
							Toast.fail("没有权限");
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},
			inputPwd1: function(e) {
				this.pwd1 = e.detail.value;
			},
			inputPwd2: function(e) {
				this.pwd2 = e.detail.value;
			},
			home: function() {
				uni.switchTab({
					url: '../index/index'
				})
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
