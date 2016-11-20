import React, {Component} from 'react';
import Nav from './Nav.jsx';


class Hero extends Component {

    render() {
    console.log("Rendering <Hero/>");

    return (


          <div>
            <Nav />
            <section>
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
                  <p>Oh no... Rabeet is exhausted from exerting all that energy getting excited... You need to help her! Hurry! She's fading fast! Create a new Goal before it's too laaaaate!</p>
                </div>

              <div className="col-lg-4">
                  <p>Whether youre a student looking to showcase your work, a professional looking to attract clients, or a graphic artist looking to share your projects, this template is the perfect starting point!</p>
              </div>
              </div>
            </section>
          </div>

    );
  }
}


export default Hero