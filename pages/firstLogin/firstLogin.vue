<template>
	<view>
		<!-- <view class="logo">
			<image src="/static/logo.png" mode="scaleToFill"></image>
		</view> -->
		<!-- 标题 -->
		<view class="title">
			<text >
				首次登录,请修改密码
			</text>
		</view>
		<!-- 输入部分 -->
		<view class="field">
			<van-cell-group>
				<van-field @blur="inputPwd1" :value="pwd1" label="密码" :clearable="clearable"  left-icon="lock" type="password" placeholder="请输入密码" maxlength="16" />
				<van-field @blur="inputPwd2" :value="pwd2" label="密码" :clearable="clearable" left-icon="lock" type="password" placeholder="请再次输入密码" maxlength="16"/>
			</van-cell-group>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<van-button @click="sureReset" type="info" round="true" size="large">确认重置</van-button>
		</view>
		<!-- 弹出提示框 -->
		<van-toast id="van-toast"/>
	</view>
</template>

<script>
	// 引入toast组件
	import Toast from 'wxcomponents/vant/toast/toast';
	
	export default {
		data() {
			return {
				pwd1:"",
				pwd2:"",
				clearable:true
			};
		},
		methods:{
			sureReset:function(){
				// Toast({
				// 	type:"success",
				// 	message:"登录成功",
				// 	duration:1500
				// });
				Toast({
					type:"fail",
					message:"登录失败",
					duration:1000
				});
			},
			inputPwd1:function(e){
				this.pwd1=e.detail.value;
			},
			inputPwd2:function(e){
				this.pwd2=e.detail.value;
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
		margin-top: 60px;
		padding: 2px 6px;
	}
	.btnArea{
		margin-top: 50upx;
		 padding: 15px;
	}
</style>
