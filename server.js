const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expbs = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');


var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {

  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
  
}).listen(3000);