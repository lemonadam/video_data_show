
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var upload = require('./routes/upload');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.bodyParser({
//        uploadDir: "tmp/",
//        keepExtensions: true,
//        limit: 10000000,
//		 defer: true  //enable event       
//}));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);
//上传文件路由
app.post('/upload', upload.upload);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
