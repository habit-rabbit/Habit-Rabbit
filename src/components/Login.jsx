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
      method: 'get',
      url: '/api/users/2',
      // data: {
      //   data: {
      //     first_name: "Ublueeous",
      //     last_name: "Granger",
      //     email: "iLoveCats@hogwarts.uk",
      //     password:"apples",
      //     password_confirmation: "apples"
      //   }
      // }
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

            <div className="modal-body">
              <form>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" name="login" value="Login" data-dismiss="modal"/>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Login