import React, {Component} from 'react';
import Nav from './Nav.jsx';

class Register extends Component {

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
            <form className="form-horizontal">
              <div className="form-group">
                <input type="text" name="first_name" placeholder="First Name"/>
              </div>
              <div className="form-group">
                <input type="text" name="last_name" placeholder="Last Name"/>
              </div>
              <div className="form-group">
                <input type="text" name="email" placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password"/>
              </div>
              <div className="form-group">
                <input type="password" name="password_confirmation" placeholder="Password Confirmation"/>
              </div>
              <div className="form-group">
                <input type="submit" name="register" className="btn btn-default" value="Sign On Up!" data-dismiss="modal"/>
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