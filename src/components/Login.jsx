import React, {Component} from 'react';
import Nav from './Nav.jsx';

class Login extends Component {

  constructor(props) {
    super(props);
    this.users = {};
  }

  componentWillMount() {
    // for demonstration
    $.ajax({
      method: 'post',
      url: '/api/users',
      data: {
        data: {
          first_name: "Ublueeous",
          last_name: "Granger",
          email: "iLoveCats@hogwarts.uk",
          password:"apples",
          password_confirmation: "apples"
        }
      }
    });
  }

  render() {
    console.log("Rendering <Login/>");

    return (
      <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h1 className="modal-title" id="myModalLabel">Login To Your Account</h1>
            </div>

            <div id="login-body" className="modal-body">
            <form>
              <div className="form-group">
>>>>>>> master
                <input type="text" name="email" placeholder="Email"/>
              </div>
              <div className="form-group">
                <input type="password" name="password" placeholder="Password"/>
              </div>
              <div className="form-group">
                <input type="submit" name="login" className="btn btn-default" value="Login" data-dismiss="modal"/>
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