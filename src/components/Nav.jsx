import React, {Component} from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

class Nav extends Component {

  constructor(props){
    super(props);
    this.createNavLinks = this.createNavLinks.bind(this);
  }


  // if user logged in show username in nav bar, else show
  createNavLinks(){
    if(this.props.isLoggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="">{this.props.userId}</a></li>
          <li><a href="/#/home" onClick={this.props.logOut}>Logout</a></li>
        </ul>
      )
    } else {
      return(
        <ul className="nav navbar-nav navbar-right">
          <li><a href= "" data-toggle="modal" data-target="#login-modal">Login</a></li>
          <Login setUserId={this.props.setUserId} updateNavLinks = {this.updateNavLinks}/>
          <li><a href= "" data-toggle="modal" data-target="#register-modal">Register</a></li>
          <Register />
        </ul>
      )
    }
  }

  render() {
    console.log("Rendering <Nav/>");
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Habit Rabbit</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="What is your new goal?" />
              </div>
              <button type="submit" className="btn btn-default">Create Goal!</button>
            </form>
            {this.createNavLinks()}
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;