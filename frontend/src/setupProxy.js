const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api/students',
        createProxyMiddleware({
            target: 'http://localhost:5500',
            changeOrigin: true,
        })
    );
}