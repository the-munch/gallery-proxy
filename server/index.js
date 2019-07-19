const express = require ('express');
const PORT = 5001;
const app = express();
const path = require('path'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

const gallery = 'http://localhost:3000';
const reservation = 'http://localhost:3001';
const popular = 'http://localhost:3002';
const header = 'http://localhost:3003';

app.all('/gallery/:id', function(req, res) {
    console.log('redirecting to gallery');
    proxy.web(req, res, { target: gallery });
});

app.all('/reservation/:id', function(req, res) {
    console.log('redirecting to reservation');
    proxy.web(req, res, { target: reservation });
});

app.all('/popular/:id', function(req, res) {
    console.log('redirecting to popular');
    proxy.web(req, res, { target: popular });
});

app.all('/header/:id', function(req, res) {
    console.log('redirecting to header');
    proxy.web(req, res, { target: header });
});

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
