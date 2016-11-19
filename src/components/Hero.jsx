import React, {Component} from 'react';


class Hero extends Component {

    render() {
    console.log("Rendering <Hero/>");

    return (

          <header>
        <div className="header-content">
            <div className="header-content-inner">
                <h1 id="homeHeading">Your Favorite Source of Free Bootstrap Themes</h1>
                <hr/>
                <p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>
                <a href="#about" className="btn btn-primary btn-xl page-scroll">Find Out More</a>
            </div>
        </div>
    </header>
    );
  }
}

export default Hero