import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Goals from './Goals.jsx';
import Carousel from './Carousel.jsx';
import Hero from './Hero.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: null,
      loggedIn: false
    }
    this.setUserId = this.setUserId.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.loggedIn = this.loggedIn.bind(this);

  }
//this renders appropriate component if user is not logged in
  renderPage() {
    if (this.state.userId === null) {
      return <Hero setUserId={this.setUserId}/>;
    } else {
      return  <Carousel />;
    }
  }

  loggedIn(){
    this.setState({loggedIn: true});
    }

  setUserId(userId) {
    this.setState({userId: userId});
  }
  getUserId(userId) {
    return this.state.userId;
  }
  render() {
    console.log("Rendering <App/>");
    console.log("user id is:", this.state.userId)
    return (
      <div className="wrapper">
        <Nav
          setUserId={this.setUserId}
          userId={this.state.userId}
         />
        {this.renderPage()}
      </div>
    );

        // {this.loggedIn()}
  }

}
export default App;
