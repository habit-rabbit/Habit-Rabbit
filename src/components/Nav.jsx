import React, {Component} from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

class Nav extends Component {

  constructor(props){
    super(props);
    this.createNavLinks = this.createNavLinks.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleLinks = this.handleLinks.bind(this);
  }

  logOut(){
     $.ajax({
      method: "post",
      url: "/logout",
      dataType: 'json'
    })
  }

  // if user logged in show username in nav bar, else show login and register links
  createNavLinks(){
    if(this.props.isLoggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hey {this.props.name}!<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="" id="ltGoals" onClick={this.handleLinks}>Goals</a></li>
              <li><a href="" id="dailyGoals" onClick={this.handleLinks}>Daily Reminders</a></li>
              <li><a href="" id="badges" onClick={this.handleLinks}>Badges</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="" onClick={this.logOut}>Logout</a></li>
            </ul>
          </li>
        </ul>
      )
    } else {
      return(
        <ul className="nav navbar-nav navbar-right">
          <li><a href= "" data-toggle="modal" data-target="#login-modal">Login</a></li>
          <Login updateNavLinks={this.updateNavLinks} verifyLogin={this.props.verifyLogin}/>
          <li><a href= "" data-toggle="modal" data-target="#register-modal">Register</a></li>
          <Register verifyLogin={this.props.verifyLogin}/>
        </ul>
      )
    }
  }

  handleLinks(event) {
    event.preventDefault();
    let id = event.target.id;
    if (id === "ltGoals"){
      this.props.setView(1);
    }
    if (id === "dailyGoals"){
      this.props.setView(2);
    }
    if (id === "badges"){
      this.props.setView(3);
    }
  }

  render() {
    console.log("Rendering <Nav/>");
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand">Habit Rabbit</a>
          {this.createNavLinks()}
        </div>
      </nav>
    );
  }
}
export default Nav;