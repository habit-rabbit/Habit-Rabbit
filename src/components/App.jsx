import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Carousel from './Carousel.jsx';

class App extends Component {


  render() {
    console.log("Rendering <App/>");

    return (
      <div className="wrapper">
        <Nav />
        <Carousel />
      </div>
    );
  }

}
export default App;
