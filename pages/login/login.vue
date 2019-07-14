<template>
	<view>
		<!-- <view class="logo">
			<image src="/static/logo.png" mode="scaleToFill"></image>
		</view> -->
		<!-- 标题 -->
		<view class="title">
			<text >
				实验室设备预约系统
			</text>
		</view>
		<!-- 输入部分 -->
		<view class="field">
			<van-cell-group>
				<van-field @blur="inputUsername" :value="username" label="账号" :clearable="clearable"  left-icon="user-o" type="number" placeholder="请输入账号" maxlength="12" />
				<van-field @blur="inputPassword" :value="password" label="密码" :clearable="clearable" left-icon="lock" type="password" placeholder="请输入密码" maxlength="16"/>
			</van-cell-group>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<van-button @click="login" type="info" round="true" size="large">登录</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"",
				password:"",
				clearable:true
			};
		},
		methods:{
			login:function(){
				// console.log(this.username);
				// console.log(this.password);
			},
			inputPassword:function(e){
				this.password=e.detail.value;
			},
			inputUsername:function(e){
				this.username=e.detail.value;
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

	.field{
		margin-top: 40px;
		padding: 2px 6px;
	}
	.btnArea{
		 padding: 15px;
	}
</style>
