import React, {Component} from 'react';


class Hero extends Component {

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


export default Hero