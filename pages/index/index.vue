<template>

	<view class="container">
		<view class="map_container">
			<map class="map" id="map" :longitude="longitude" :latitude="latitude" :scale="16"
				:markers="markers"></map>
		</view>
		<button class="wx-btn-login" type="primary" :plain="isDisable" :disabled="isDisable" @click="getUserProfile">
			微信登录22
		</button>
		<!-- <uni-search-bar @confirm="search" :focus="isFocus" v-model="searchValue" @blur="blur" @focus="focus"
			@input="input" @cancel="cancel" @clear="clear" placeholder="请输入菜名">
		</uni-search-bar> -->
		<view class="box-list">
			<scroll-view class="m-serch-content" scroll-y="true" :refresher-triggered="triggered"
				:refresher-threshold="45" refresher-background="lightgreen" @scrolltolower="onRefresh">
				<uni-list :border="true">
					<uni-list-chat v-for="(item, index) in foodSearchList" :title="item.title" thumb-size="lg"
						:avatar="item.avatar" :note="item.note" :time="item.time"></uni-list-chat>
				</uni-list>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Request from 'utils/request';
	import amapFile from 'utils/amap-wx.130.js';
	export default {
		data() {
			return {
				searchValue: '',
				isFocus: false,
				triggered: false,
				foodSearchList: [{
					title: '如何做一道好吃的菜肴11',
					avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					note: '高端的食材往往采用最朴素的烹饪方式',
					time: '2020-02-02 20:20'
				}],
				
				markers: [],
				latitude: '',
				longitude: '',
				textData: {}
			}
		},
		onLoad() {
			console.log('amapFile---------', amapFile);
			this.getLocation();
			this.login();
			this._freshing = false;
			for (let i = 0; i < 10; i++) {
				this.foodSearchList = [...this.foodSearchList, {
					title: '如何做一道好吃的菜肴11',
					avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
					note: '高端的食材往往采用最朴素的烹饪方式',
					time: '2020-02-02 20:20'
				}]
			}
			// setTimeout(() => {
			// 	this.triggered = true;
			// }, 1000)
		},
		methods: {
			getLocation() {
				const that = this;
				const myAmapFun = new amapFile.AMapWX({
					key: 'fe303bc170209c7c18b082da2f35acd4'
				});
				myAmapFun.getRegeo({
					iconPath: "../../img/marker.png",
					iconWidth: 22,
					iconHeight: 32,
					success: function(data) {
						var marker = [{
							id: data[0].id,
							latitude: data[0].latitude,
							longitude: data[0].longitude,
							iconPath: data[0].iconPath,
							width: data[0].width,
							height: data[0].height
						}]
						that.markers = marker
						that.latitude = data[0].latitude
						that.longitude = data[0].longitude
						that.textData = {
							name: data[0].name,
							desc: data[0].desc
						}
					},
					fail: function(info) {
						// wx.showModal({title:info.errMsg})
					}
				})
			},
			login() {
				let _self = this
				uni.showLoading({
					title: "加载中...",
				})
				uni.login({
					provider: "weixin",
					onlyAuthorize: true,
					success: function(loginRes) {
						console.log('loginRes', loginRes)
						let data = {
							code: loginRes.code
						}
						Request("/wx/getAccessToken", data).then(res => {
							console.log(res)
							uni.setStorageSync("openid", res.openid)
							uni.setStorageSync("session_key", res.session_key)
							uni.hideLoading()
						})
					},
				})
			},
			getUserProfile(e) {
				let _self = this
				uni.getUserProfile({
					desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: res => {
						let userInfo = res.userInfo
						let data = {
							encryptedData: res.encryptedData,
							iv: res.iv,
							sessionKey: uni.getStorageSync("session_key"),
							openId: uni.getStorageSync("openid"),
						}
						_self.$request("/wx/userinfo", data).then(ret => {
							uni.setStorageSync("avatar", ret.avatarUrl)
							uni.setStorageSync("nickname", ret.nickName)
							setTimeout(() => {
								uni.switchTab({
									url: "/pages/mine/index",
								})
							}, 50) 
						})
					},
				})
			},

			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {

			},
			focus(e) {
				this.isFocus = true;
			},
			cancel(res) {
				this.isFocus = false;
			},
			onRefresh() {
				if (this._freshing) return;
				uni.showToast({
					title: '加载成功'
				})
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 3000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;

		.search-result {
			padding-top: 10px;
			padding-bottom: 20px;
			text-align: center;
		}

		.search-result-text {
			text-align: center;
			font-size: 14px;
			color: #666;
		}
	}

	.m-serch-content {
		height: calc(100vh - 56px);
	}


	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}

	.uni-mt-10 {
		margin-top: 10px;
	}
</style>
