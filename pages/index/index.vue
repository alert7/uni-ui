<template>

	<view class="container">
		<button type="primary">去打卡</button>
	</view>
</template>

<script>
	import Request from 'utils/request';
	import amapFile from 'utils/amap-wx.130.js';
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			
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
