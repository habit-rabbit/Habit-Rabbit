const express              = require("express");
const app                  = express();
const webpack              = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config               = require("./webpack.config");
const compiler             = webpack(config);
const cookieSession        = require("cookie-session")
const bodyParser           = require("body-parser");
const path                 = require("path");

require("dotenv").config({silent: true});

const port = process.env.PORT || 3000;


app.set("view engine", "ejs");

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
  name: "session",
  secret: process.env.SECRET
}));

app.use(require("webpack-hot-middleware")(compiler));

// routing
app.use(require("./routes/home"));

// database api
app.use(require("./api/routes"));

// required to serve publib/img file
app.use(express.static(path.resolve(__dirname, "./public")));

// spin up our express server
app.listen(port, function () {
  console.log("App listening on port:", port);
});
