var express = require('express'); 
var app = express(); 
var server = app.listen(80); 
var routes = require('./routes')(app); 

