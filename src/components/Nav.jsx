import React, {Component} from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

class Nav extends Component {

  constructor(props){
    super(props);
    this.createNavLinks = this.createNavLinks.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // if user logged in show username in nav bar, else show
  createNavLinks(){
    if(this.props.userId){
      return (
        <div>
          <li><a href="">Name!!!!</a></li>
          <li><a href="">Logout!!!!</a></li>
        </div>
      )
    } else {
      return(
        <div>
          <li><a href= "" data-toggle="modal" data-target="#login-modal">Login</a></li>
          <Login setUserId={this.props.setUserId}/>
          <li><a href= "" data-toggle="modal" data-target="#register-modal">Register</a></li>
          <Register />
        </div>
      )
    }
  }

  //logs out user when they click the logout link
  logOut(){}

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


            <ul className="nav navbar-nav navbar-right">
              {createNavLinks()}
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;