
/**
 * Module dependencies.
 */

var express = require('express')
  , route = require('./route')
  , http = require('http')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path')
  , expressValidator = require('express-validator');

var app = express();

app.configure(function(){

  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: function compile(str, path) {
      return stylus(str)
        .set('filename', path)
        .use(nib());
    }
  }));
  
  app.use(express.bodyParser());
  app.use(expressValidator()); // this line must be immediately after express.bodyParser()!
  app.use(require("./middleware/set-pagedata"));
  app.use(require("./middleware/validator"));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));


});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

route(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




