const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
	app.use(
		"/",
		createProxyMiddleware({
			 target: "http://100.0.0.157:30180", // 레드마인 api 주소 및 포트
			//target : "http://localhost:8080",
			changeOrigin: true,
			ws:false
		})
	)
}