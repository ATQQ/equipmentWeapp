<template>
	<view class="mine">
		<!-- 上半部分 -->
		<view class="userInfo">
			<text class="userName">{{userInfo.userName}}</text>
			<text class="userNumber">{{userInfo.userNumber}}</text>
			<view class="profession"><text>学院:{{userInfo.userAcademy}}</text> <text>专业:{{userInfo.userProfession}}</text></view>
		</view>
		<!-- 功能区域 -->
		<view class="fun-options">
			<!-- 选择 -->
			<view @tap="switchOptions($event)" class="option" v-for="(option,index) in options" :key='index' :data-key="option.key">
				<!-- 左半部分图标与内容 -->
				<view class="left">
					<van-icon :name="option.icon" /><text>{{option.text}}</text>
				</view>
				<!-- 右半部分箭头 -->
				<view class="right">
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					userName: '小明',
					userNumber: 201731061422,
					userProfession: '计算机科学与技术',
					userAcademy: '计科院'
				},
				options: [{
						icon: 'smile-o',
						text: '个人信息',
						key: 'user'
					},
					{
						icon: 'close',
						text: '退出',
						key: 'exit'
					}

				]
			};
		},
		methods: {
			getUserInfo: function() {
				let userInfo = getApp().globalData.userInfo;
				this.userInfo = userInfo;
			},
			switchOptions: function(e) {
				let {
					key
				} = e.target.dataset;

				switch (key) {
					case 'exit':
						uni.showModal({
							title: '注销',
							content: '是否退出登录',
							cancelText: '否',
							confirmText: '是',
							confirmColor: '#1989FA',
							success: function(res) {
								if (res.confirm) {
									getApp().globalData.eqToken = null;
									// 关闭所有页面后跳转
									uni.reLaunch({
										url:'../login/login'
									})

								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						break;
					case 'user':
					uni.navigateTo({
						url: '../personInfo/personInfo'
					});
					break;
				}

			}
		},
		onLoad: function() {
			/**
			 * 未登录
			 */
			if(!getApp().$vm.$options.isLogin()){
				uni.redirectTo({
					url: '../login/login'
				});
			}

			this.getUserInfo();
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

	.userInfo {
		background-color: #1989fa;
		min-height: 100px;
		display: flex;
		flex-direction: column;

		text {
			text-align: center;
			color: #fff;
			padding-top: 0.4rem;
		}

		.userName {
			font-size: 1rem;
		}

		.userNumber {
			font-size: 0.75rem;
		}

		.profession {
			font-size: 0.7rem;

			text {
				display: inline-block;
				width: 50%;
			}
		}
	}
</style>
