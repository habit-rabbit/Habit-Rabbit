// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Hero from './components/Hero.jsx';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router'
ReactDOM.render(

  //here we would have our conditionals some ho that sets up the redirects
  // ie   <IndexRedirect to="/welcome" />

 <Router history={hashHistory} >
    <Route path="/">
        <IndexRedirect to="/login" />
      <Route path="/login" component={Login} />
    </Route>
    <Route path="/home" component={App} />
     <Route path="/hero" component={Hero} />
 </Router>
  , document.getElementById('react-root'));


