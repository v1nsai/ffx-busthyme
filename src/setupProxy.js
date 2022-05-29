const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/bustime/api/v3/getpatterns',
        createProxyMiddleware({
            target: 'https://www.fairfaxcounty.gov',
            changeOrigin: false
        }),
    ),
    app.use(
        '/gtfsrt/vehicles',
        createProxyMiddleware({
            target: 'https://www.fairfaxcounty.gov',
            changeOrigin: false
        })
    )
    app.use(
        '/maps/api/js',
        createProxyMiddleware({
            target: 'https://maps.googleapis.com',
            changeOrigin: false
        })
    )
};