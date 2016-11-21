import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Goals from './Goals.jsx';
import Carousel from './Carousel.jsx';
import Hero from './Hero.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: null
    }
    this.setUserId = this.setUserId.bind(this);
  }



//THIS LOGIC IS IN BETA TESTING - cecia and nat were attempting to get login routes working
    // loggedIn() {
    //   if (this.state.isLoggedIn) {
    //     return <Goals goalInfo={this.state.goals}/>
    //   } else {
    //     return <Hero />
    //   }
    // }
  setUserId(userId) {
    console.log("USER ID!!!!!!!!!!!!!!!!!!!!!!!!")
    this.setState({'userId': userId});
    console.log(this.state)
  }
  render() {
    console.log("Rendering <App/>");
    console.log(this.state, "rendered state")


        // {this.loggedIn()}
    return (
      <div className="wrapper">
        <Nav setUserId={this.setUserId}></Nav>
        <Carousel/>
      </div>
    );
  }

}
export default App;
