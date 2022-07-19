const baseUrl = "http://124.222.2.31:8091"
const request = (url = "", data = {}, type = "GET", header = {}) => {
	return new Promise((resolve, reject) => {
		uni
			.request({
				method: type,
				url: baseUrl + url,
				data: data,
				header: header,
				dataType: "json",
			})
			.then(response => {
				setTimeout(function() {
					uni.hideLoading()
				}, 200)
				let [error, res] = response
				if (res.data.code !== 200) {
					console.log("失败")
					return
				}
				resolve(res.data.data)
			})
			.catch(error => {
				let [err, res] = error
				reject(err)
			})
	})
}
export default request
