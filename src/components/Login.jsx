import React, {Component} from 'react';
import Nav from './Nav.jsx';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';


class Login extends Component {

  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      email: "",
      password: "",
      loginError:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "email") {
      this.setState({email: value});
    }
    if (id === "password") {
      this.setState({password: value});
    }
  }
  renderError() {
    if (this.state.loginError) {
      return (
          <div className="alert alert-warning">
            {this.state.loginError}
          </div>
        )
    }
  }
 handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      method: 'post',
      url: '/login',
      dataType: 'json',
      data: {
        data: {
          email: this.state.email,
          password: this.state.password
        }
      }
    }).then( (result) => {
      if (result.data.id) {
        this.props.setUserId(result.data.id);
        this.setState({email: "", password: "", loginError: null});
        $("#login-modal").modal("hide");
        //call function to update navbar here
        this.props.verifyLogin();
        this.props.updateNavLinks();
      } else if (result.error.msg) {
        this.setState({loginError: result.error.msg})
      }
    });

  }

  render() {

    return (
      <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h1 className="modal-title" id="myModalLabel">Login To Your Account</h1>
            </div>

            <div id="login-body" className="modal-body">
            {this.renderError()}
            <form onSubmit={this.handleSubmit}>

              <div className="form-group">
                <input id="email" type="text" value={this.state.email} onChange={this.handleChange} name="email" placeholder="Email"/>
              </div>

              <div className="form-group">
                <input id="password" type="password" value={this.state.password} onChange={this.handleChange} name="password" placeholder="Password"/>
              </div>

              <div className="form-group">
                <input type="submit" name="login" className="btn btn-default" value="Login" />
              </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Login