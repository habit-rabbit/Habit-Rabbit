import React, {Component} from 'react';


class Login extends Component {


  constructor(props) {
    super(props);
    this.users = {};
  }

  componentWillMount() {
    // axios.get('/api/users').then( (response) => {
    //   this.setState({users: response});
    //   console.log(this.users);
    //   console.log("blah");
    // });
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
export default Login;