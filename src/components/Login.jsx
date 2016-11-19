import React, {Component} from 'react';


class Login extends Component {


  constructor(props) {
    super(props);
    this.users = {};
  }

  componentWillMount() {
    $.ajax({
      method: 'post',
      url: '/api/users',
      data: {
        type: 'insert',
        table: 'users',
        data: {
          first_name: "Hermione",
          last_name: "Granger",
          email: "iLoveCats@hogwarts.uk",
          password_digest: "notdigested"
        }
      }
    });
  }

  render() {
    console.log("Rendering <Login/>");

    return (
      <div className="login">
          <h1>Login to Your Account</h1><br/>
          <p>   </p>
          <form>
            <input type="text" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="submit" name="login" value="Login"/>
          </form>

      </div>
    );
  }
}
export default Login