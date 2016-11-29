import React, {Component} from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

class Nav extends Component {

  constructor(props){
    super(props);
    this.createNavLinks = this.createNavLinks.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleLinks = this.handleLinks.bind(this)
    this.handleKey = this.handleKey.bind(this);
    this.newBadge = this.newBadge.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKey, false);
  }

  handleKey(event) {
    if(event.altKey && (event.key === 'g')) {
      event.target.id = "ltGoals"
      this.handleLinks(event);
    } else if(event.altKey && (event.key === 'b')) {
      event.target.id = "badges"
      this.handleLinks(event);
    } else if(event.altKey && (event.key === 'd')) {
      event.target.id = "dailyGoals"
      this.handleLinks(event);
    }
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
        {this.newBadge()}
          <li className="dropdown">
            <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Hey {this.props.name}!<span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="" id="ltGoals" onClick={this.handleLinks}>Goals</a></li>
              <li><a href="" id="dailyGoals" onClick={this.handleLinks}>Daily Reminders</a></li>
              <li><a href="" id="badges" onClick={this.handleLinks}>Badges</a></li>
              <li><a href="" id="dashboard" onClick={this.handleLinks}>Dashboard</a></li>
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
    let className = event.target.className
    if (id === "ltGoals"){
      this.props.setView(1);
    }
    if (id === "dailyGoals") {
      this.props.setView(2);
    }
    if (id === "badges" || id === "new-badge"){
      this.props.setView(3);
      this.props.resetBadgeAlert();
    }
    if (id === "dashboard") {
      this.props.setView(4)
    }
  }

  newBadge(){
    if (this.props.newBadge === true){
      return (
        <li>
          <a href="" id="new-badge" onClick={this.handleLinks}>
            <span id="new-badge" onClick={this.handleLinks} className="glyphicon glyphicon-star" aria-hidden="true"></span>
          </a>
        </li>
      );
    }
    if (id === "ltGoals") {
      this.props.setView(4);
    }
  }

  render() {
    console.log("Rendering <Nav/>");
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <a className="navbar-brand" href="" id="nav-header" onClick={this.handleLinks}>Habit Rabbit</a>
          {this.createNavLinks()}
        </div>
      </nav>
    );
  }
}
export default Nav;