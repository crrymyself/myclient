const proxy = require('http-proxy-middleware');

module.exports = function proxyChange(app) {
  app.use(proxy('/api', {
    target: 'http://localhost:3100',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  }));
};

