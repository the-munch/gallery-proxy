const express = require ('express');
const PORT = 5004;
const app = express();
const path = require('path'); 
const morgan = require('morgan');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

app.use(morgan('dev'));
app.use('/:id', express.static(path.join(__dirname, '/../client')));

const gallery = 'http://ec2-52-53-207-161.us-west-1.compute.amazonaws.com:3000';
const reservation = 'http://ec2-18-217-9-12.us-east-2.compute.amazonaws.com:3001';
const popular = 'http://ec2-3-95-234-77.compute-1.amazonaws.com';
const header = 'http://ec2-18-223-24-238.us-east-2.compute.amazonaws.com:3003/';

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
