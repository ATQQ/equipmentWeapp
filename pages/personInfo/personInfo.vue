<template>
	<view class="person-info">
		<view class="fun-options">
			<!-- 选择 -->
			<view @tap="switchOptions($event)" class="option" v-for="(option,index) in options" :key='index'>
				<!-- 左半部分图标与内容 -->
				<view class="left">
					<van-icon :name="option.icon" /><text>{{option.title}}</text>
				</view>
				<!-- 右半部分箭头 -->
				<view class="right">
					<text>{{option.text}}</text><!-- <van-icon name="arrow" /> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: [{
						icon: 'smile-o',
						title: '姓名',
						text: 'userName'
					},
					{
						icon: 'credit-pay',
						title: '学号',
						text: 'userNumber'
					}, {
						icon: 'flag-o',
						title: '院系',
						text: 'userAcademy'
					}, {
						icon: 'award-o',
						title: '专业',
						text: 'userProfession'
					},
					{
						icon: 'phone-o',
						title: '电话',
						text: 'userPhone'
					}
				],
				userInfo:{
					userProfession: "舞蹈",
					userAcademy: "艺术院",
					userPhone: null,
					deposit: 0,
					userName: "小天才",
					userNumber: "201731061423",
					userPower: 0
				}
			};
		},
		mounted:function(){
			this.userInfo=getApp().globalData.userInfo;
			
			this.options.forEach(v=>{
				v.text=this.userInfo[v.text]||'暂未绑定';
			})
		},
		filters:{
			// 弃用
			userInfoText:function(v){
				if(!!this.userInfo){
					return;
				}
				return !!this.userInfo[v]?this.userInfo[v]:'还未绑定';
			}
		}
	}
</script>

<style lang="less">
	.fun-options {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;

		.option {
			display: flex;
			justify-content: space-between;
			padding: 1rem 0.5rem;
			background-color: #fff;
			box-shadow: 0 0 5px #ddd;
			border-bottom: 1px solid #ddd;

			.left text {
				position: relative;
				top: -0.2rem;
				padding-left: 1rem;
				font-size: 0.8rem;
			}

			.right text {
				position: relative;
				top: -0.2rem;
				padding-right: 1rem;
				font-size: 0.8rem;
			}

			&:first-child {
				border-top-right-radius: 0.5rem;
				border-top-left-radius: 0.5rem;
			}

			&:last-child {
				border-bottom-right-radius: 0.5rem;
				border-bottom-left-radius: 0.5rem;
				border-bottom: none;
			}


		}
	}
</style>
