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
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));

//app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));

/* ======= photos service ======= */
app.use('/api/hostels/:hostel_id/images', createProxyMiddleware({target: 'http://localhost:3007', changeOrigin: true}));

/* ======= property info service ======= */
app.use('api/house/:id/hostel', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true}));

app.use('api/house/:id/description', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true}));

app.use('api/house/:id/rules', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true}));

app.use('api/house/:id/address', createProxyMiddleware({target: 'http://localhost:3000', changeOrigin: true}));

/* ======= availability service ======= */
app.use('/api/hostel/:hostelId/rooms', createProxyMiddleware({target: 'http://localhost:3009', changeOrigin: true}));

/* ======= reviews service ======= */
app.use('/api/reviews', createProxyMiddleware({target: 'http://localhost:3001', changeOrigin: true}));

app.listen(PORT, () => console.log(`Proxy Server is running on port ${PORT}`));
