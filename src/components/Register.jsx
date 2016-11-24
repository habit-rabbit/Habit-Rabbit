import React, {Component} from 'react';
import Nav from './Nav.jsx';

class Register extends Component {
  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      first_name: "",
      last_name:"",
      email: "",
      password: "",
      password_confirmation: "",
      regError: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "first_name") {
      this.setState({first_name: value});
    }
    if (id === "last_name") {
      this.setState({last_name: value});
    }
    if (id === "email") {
      this.setState({email: value});
    }
    if (id === "password") {
      this.setState({password: value});
    }
    if (id === "password_confirmation") {
      this.setState({password_confirmation: value});
    }

  }

 handleSubmit(event) {
    event.preventDefault();


    if (this.state.first_name && this.state.last_name && this.state.email && this.state.password) {

      $.ajax({
        method: 'post',
        url: 'api/users/create',
        data: {
          data: {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        }
      }).then( (result) => {
        if (result.data.isLoggedIn) {
          this.setState({first_name: '', last_name: '', email: '', password: '', password_confirmation: '', regError: null});
          this.props.verifyLogin();
          $("#register-modal").modal("hide");
        } else if (result.error.msg) {
          this.setState({regError: result.error.msg})
        }
      });

    } else {
      this.setState({regError: "Please complete all fields"})
    }
  }

  renderError() {
    if (this.state.regError) {
      return (
          <div className="alert alert-warning">
            {this.state.regError}
          </div>
        )
    }
  }

  render() {
    console.log("Rendering <Register/>");

    return (
      <div className="modal fade" id="register-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h1 className="modal-title" id="myModalLabel">Sign Up For Your Account</h1>
            </div>

            <div id="register-body">
            {this.renderError()}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" id="first_name" name="first_name" placeholder="First Name" value={this.state.value} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="text" id="last_name" name="last_name" placeholder="Last Name" value={this.state.value} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="text" id="email" name="email" placeholder="Email" value={this.state.value} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="password" id="password" name="password" placeholder="Password" value={this.state.value} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Password Confirmation" value={this.state.value} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="submit" name="register" className="btn btn-default" value="Sign On Up!" />
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register