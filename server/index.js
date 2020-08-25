const express = require('express');
const favicon = require('serve-favicon');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const PORT = 3333;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(favicon(path.join(__dirname, './public', 'favicon.ico')));
app.use('/hostels/:id', express.static(path.join(__dirname, '../public')));

//app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));

/* ======= photos service ======= */
app.use('/api/hostels/:id/images', createProxyMiddleware({target: 'http://3.129.58.132', changeOrigin: true}));

/* ======= property info service ======= */
app.use('api/house/:id/hostel', createProxyMiddleware({target: 'http://13.59.238.221:3000', changeOrigin: true}));

app.use('api/house/:id/description', createProxyMiddleware({target: 'http://13.59.238.221:3000', changeOrigin: true}));

app.use('api/house/:id/rules', createProxyMiddleware({target: 'http://13.59.238.221:3000', changeOrigin: true}));

app.use('api/house/:id/address', createProxyMiddleware({target: 'http://13.59.238.221:3000', changeOrigin: true}));

/* ======= availability service ======= */
app.use('/api/hostel/:id/rooms', createProxyMiddleware({target: 'http://13.58.114.238:3009', changeOrigin: true}));

/* ======= reviews service ======= */
app.use('hostels/:id/api/reviews', createProxyMiddleware({target: 'http://18.191.32.68', changeOrigin: true}));

app.listen(PORT, () => console.log(`Proxy Server is running on port ${PORT}`));
