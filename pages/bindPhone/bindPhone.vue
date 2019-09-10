<template>
	<view>
		<!-- 标题 -->
		<view class="title">
			<text>
				手机号绑定
			</text>
		</view>
		<!-- 输入部分 -->
		<view class="field">
			<van-cell-group>
				<van-field @input="inputPhone" :value="phone" label="手机号" :clearable="clearable" left-icon="phone" type="number"
				 placeholder="请输入手机号" maxlength="11" />
				<van-field @input="inputCode" :value="code" label="验证码" :clearable="clearable" left-icon="like-o" type="number"
				 placeholder="请输入验证码" maxlength="6" use-button-slot>
					<van-button @click="sendCode"  slot="button" size="small" type="info" :disabled="codeDisabled">{{codeText}}</van-button>
				</van-field>
			</van-cell-group>
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea">
			<van-button @click="sureBind" type="info" round="true" size="large">确认绑定</van-button>
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
				phone: "",
				code: "",
				clearable: true,
				codeDisabled: true,
				codeText: "发送验证码",
				codeTime: 90 //验证码间隔时长
			};
		},
		methods: {
			/**
			 * 发送验证码
			 */
			sendCode: function() {
				const that = this;
				//时长
				let codeTime = this.codeTime;
				//按钮不可点击
				that.codeDisabled = true;
				//开始倒计时
				var f = function() {
					if (codeTime === 0) {
						that.codeDisabled = false;
						that.codeText = "发送验证码";
						return;
					}
					that.codeText = codeTime + "s";
					codeTime--;
					setTimeout(function() {
						f();
					}, 1000);
				}

				/**
				 * 发送验证码
				 */
				uni.request({
					url: this.$baseUrl + `config/code/${that.phone}`,
					method: 'GET',
					success: res => {
						res = res.data;
						console.log(res);
						if (res.code === 200) {
							f();
						}
					}
				});

			},
			/**
			 * 确定绑定手机号
			 */
			sureBind: function() {
				if (this.code.length !== 4) {
					Toast.fail('验证码格式不正确')
					return;
				}
				let that = this;
				// 验证 验证码是否正确
				uni.request({
					url: `${this.$baseUrl}config/code/${this.phone}`,
					method: 'POST',
					data: JSON.stringify({
						'code': that.code
					}),
					success: res => {
						res = res.data;
						if (res.code === 200) {
							that.bindPhone();
						}else if(res.code===201){
							Toast.fail("验证码错误");
						}
					}
				});
			},
			/**
			 * 绑定手机号
			 */
			bindPhone:function(){
				let that=this;
				uni.request({
					url: `${this.$baseUrl}user/userinfo/${getApp().globalData.userInfo.userNumber}`,
					method: 'PUT',
					header:{
						"eq-token":getApp().globalData.eqToken
					},
					data: JSON.stringify({
						userPhone:this.phone
					}),
					success: res => {
						res=res.data;
						if(res.code===200){
							Toast.success('绑定成功');
							getApp().globalData.userInfo.userPhone=that.phone;
							uni.switchTab({
								url:'../index/index'
							})
						}else if(code===202){
							Toast.fail('手机号已存在,请换个手机号试试');
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			/**
			 * 手机号录入
			 * @param {Object} e
			 */
			inputPhone: function(e) {
				// console.log(e.detail);
				this.phone = e.detail;
				var rPhone = /^[1]([3-9])[0-9]{9}$/;
				this.codeDisabled = !rPhone.test(this.phone);
			},
			/**
			 * 输入验证码
			 * @param {Object} e
			 */
			inputCode: function(e) {
				this.code = e.detail;
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
	}
</style>
