import React, {Component} from 'react';


class Hero extends Component {
  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      first_name: "",
      last_name:"",
      email: "",
      password: "",
      password_confirmation: "",
      signupError: null
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
      //clear text fields
      console.log(result);
        this.setState({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
          signupError: null});
      if(result.data.id) {
        console.log("worked")
        //set user state for App
        this.props.setUserId(result.data.id);
      } else if(result.error.msg) {
        this.setState({signupError: result.error.msg});
      }
    });
  }
  renderError() {
    if (this.state.signupError) {
      return (
        <div className="alert alert-warning">
          {this.state.signupError}
        </div>
      );
    }
  }
    render() {
    console.log("Rendering <Hero/>");

    return (
      <div id="hero-page">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                  <h2>Meet Rabeet: the Rabid Habit Rabbit</h2>
              </div>
            </div>
            <div className="img-container">
              <img src="http://needlemedia.com/images-portfolio/vside-sticker-evil-bunny.png" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-lg-offset-2">
              <p>Today is a big day for Rabeet.</p>
              <p>Today, Rabeet is going to get out of her burrow.</p>
              <p>Rabeet is going to turn off Netflix, regardless of how far through a fresh binge she is. Also how dare you think that's an accomplishment.</p>
              <p>Rabeet is going to try something she has always wanted to do... She is going to get off her tail and seize the day! Carpe Diem! Drink Lemonade!...Or whatever.</p>
              <p><em>Oh no... Rabeet is exhausted from exerting all that energy getting excited... You need to help her! Hurry! She's fading fast! Create a new Goal before it's too laaaaate!</em></p>
            </div>

          <div className="col-lg-4">
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


export default Hero