<template>
	<view>
		<!-- 标题 -->
		<view class="title">
			<text >
				手机号绑定
			</text>
		</view>
		<!-- 输入部分 -->
		<view class="field">
			<van-cell-group>
				<van-field @blur="inputPhone" :value="phone" label="手机号" :clearable="clearable"  left-icon="phone" type="number" placeholder="请输入手机号" maxlength="11" />
				<van-field @blur="inputCode" :value="code" label="验证码" :clearable="clearable"  left-icon="like-o" type="number" placeholder="请输入验证码" maxlength="6"  use-button-slot>
					<van-button @click="sendCode" slot="button" size="small" type="info" :disabled="codeDisabled">{{codeText}}</van-button>
				</van-field>
			</van-cell-group>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<van-button @click="sureBind" type="info" round="true" size="large">确认绑定</van-button>
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
				phone:"",
				clearable:true,
				codeDisabled:false,
				codeText:"发送验证码",
				codeTime:90//验证码间隔时长
			};
		},
		methods:{
			sendCode:function(){
				const that=this;
				//时长
				let codeTime=this.codeTime;
				//按钮不可点击
				that.codeDisabled=true;
				//开始倒计时
				var f=function(){
					if(codeTime===0){
						that.codeDisabled=false;
						that.codeText="发送验证码";
						return;
					}
					that.codeText=codeTime+"s";
					codeTime--;
					setTimeout(function(){
						f();
					}, 1000);
				}
				f();
			},
			sureBind:function(){
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
			inputPhone:function(e){
				this.phone=e.detail.value;
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
