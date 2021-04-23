const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware({
    target: "http://demoapi.rexsoftproduction.com",
    changeOrigin: true
  }));
};