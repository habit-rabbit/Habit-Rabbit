import React, {Component} from 'react';


class Login extends Component {


  constructor(props) {
    super(props);
    this.users = {};
  }

  componentWillMount() {
    $.ajax({
      method: 'post',
      url: '/api/goals/4/delete',
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