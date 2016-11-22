import React, {Component} from 'react';
import Login from './Login.jsx';
import Register from './Register.jsx';

class Nav extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      loggedIn: false
    }
    this.createNavLinks = this.createNavLinks.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  logOut(){
    console.log("=====do i enven get to the logout function?======");
     $.ajax({
      method: "post",
      url: "/logout",
      dataType: 'json'
    }).done((data) => {
      console.log("============Am I logged OUT=========?:");
      // this.setState({isLoggedIn: data.isLoggedIn});
    });
  }

  // if user logged in show username in nav bar, else show
  createNavLinks(){
    if(this.props.isLoggedIn) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="">{this.props.userId}</a></li>
          <li><a href="" onClick={this.logOut}>Logout</a></li>
        </ul>
      )
    } else {
      return(
        <ul className="nav navbar-nav navbar-right">
          <li><a href= "" data-toggle="modal" data-target="#login-modal">Login</a></li>
          <Login setUserId={this.props.setUserId} updateNavLinks={this.updateNavLinks} verifyLogin={this.props.verifyLogin}/>
          <li><a href= "" data-toggle="modal" data-target="#register-modal">Register</a></li>
          <Register />
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
    console.log("DO I LIVE HERE??")
    $.ajax({
      method: 'post',
      url: '/api/goals/create',
      dataType: 'json',
      data: {
        data: {
          name: this.state.name,
          user_id: this.props.userId,
          private: true,
          deadline: "2016-12-14"
        }
      }
    }).then((result) => {
      console.log("RESULTTTTAN OF SWING", result);
        // $(this).find('form-group').resetForm();
        $('#goal-name').val("")
        })
  }



  //logs out user when they click the logout link
  logOut(){
    this.setState({loggedIn: false});
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
            <form onSubmit={this.handleSubmit} className="navbar-form">
              <div className="form-group">
                <input type="text" id="goal-name" className="form-control" onChange={this.handleChange} placeholder="What is your new goal?" />
              </div>
              <input type="submit" className="btn btn-default" value="Create Goal!"/>
            </form>
            {this.createNavLinks()}
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;