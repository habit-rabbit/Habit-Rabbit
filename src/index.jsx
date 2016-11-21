// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Hero from './components/Hero.jsx';
import Goals from './components/Goals.jsx';
import Carousel from './components/Carousel.jsx';


import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router'
ReactDOM.render(

  //here we would have our conditionals some ho that sets up the redirects
  // ie   <IndexRedirect to="/welcome" />

  <Router history={hashHistory} >
    <Route path="/">
      <IndexRedirect to="/hero" />
        <Route path="/hero" component={Hero} />
  </Route>
  <Route path="/home" component={App} />
    <Route path="/goals" component={Carousel} />
  </Router>
, document.getElementById('react-root'));


