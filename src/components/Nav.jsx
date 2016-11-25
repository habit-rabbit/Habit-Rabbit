import React, {Component} from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';
import CreateGoalModal from './CreateGoalModal.jsx';

class Nav extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
    }
    this.createNavLinks = this.createNavLinks.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  logOut(){
     $.ajax({
      method: "post",
      url: "/logout",
      dataType: 'json'
    })
  }

  // if user logged in show username in nav bar, else show
  createNavLinks(){
    if(this.props.isLoggedIn) {
      return (
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form" onSubmit={this.handleSubmit} >
              <input type="submit" id="goal-button" className="btn btn-default"  value="Create A New Goal!"/>
            </form>
          <CreateGoalModal goalName={this.state.name} updateGoalsIndex={this.props.updateGoalsIndex}/>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="">Hey {this.props.name}!</a></li>
            <li><a href="" onClick={this.logOut}>Logout</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="">Long Term Goals</a></li>
                <li><a href="">Daily Goals</a></li>
                <li><a href="">Badges</a></li>
              </ul>
            </li>
          </ul>
        </div>
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

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "goal-name") {
      this.setState({name: value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    $("#create-goal-modal").modal();
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
            <a className="navbar-brand" href="">Habit Rabbit</a>
          </div>
          {this.createNavLinks()}
        </div>
      </nav>
    );
  }
}
export default Nav;