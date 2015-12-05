var express = require('express');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var connectLivereload = require('connect-livereload');

var app = express();

app.use(connectLivereload());
app.use(express.static('build'));
app.use(express.static('app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mockEndpoints = requireDir('mocks');
for(var endpoint in mockEndpoints){
  if(mockEndpoints.hasOwnProperty(endpoint)){
    mockEndpoints[endpoint](app);
  }
}

app.listen(3000, function () {
  console.log('mock app started...');
});

module.exports = app;
