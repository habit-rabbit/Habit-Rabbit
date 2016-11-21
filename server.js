
// const ENV = process.env.ENV || "development";
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);
const cookieSession = require('cookie-session')
const bodyParser  = require("body-parser");

require('dotenv').config({silent: true});

const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

// setup webpack middleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  //to be changed
  secret: "liamneeson"
}));
app.use(require("webpack-hot-middleware")(compiler));

// routing
app.use(require('./routes/home'));
// database api

app.use(require('./api/routes'));

// configure slack
// (function() {
//   var Slack = require('./lib/slack');
//   var slack = new Slack(process.env.SLACK_TOKEN);
//   slack.on('message', function(message) {
//     console.log("Message:", message.user.name, message.channel.name, message.text);
//   });
// })();

// spin up our express server
app.listen(port, function () {
  console.log('Example app listening on port:', port);
});
