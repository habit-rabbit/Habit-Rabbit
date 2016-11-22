import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Goals from './Goals.jsx';
import Carousel from './Carousel.jsx';
import Hero from './Hero.jsx';
import CreateGoal from './CreateGoal.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: null,
      isLoggedIn: false
    }
    this.setUserId = this.setUserId.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    // this.logOut = this.logOut.bind(this);

  }

  componentWillMount(){
    this.verifyLogin();
  }

  verifyLogin(){
    $.ajax({
      method: "get",
      url: "/login",
      dataType: 'json'
    }).done((data) => {
      console.log("Am I logged in?:", data.isLoggedIn);
      this.setState({isLoggedIn: data.isLoggedIn});
    });
  }

  // logOut(){
  //   console.log("=====do i enven get to the logout function?======");
  //    $.ajax({
  //     method: "post",
  //     url: "/logout",
  //     dataType: 'json'
  //   }).done((data) => {
  //     console.log("============Am I logged OUT=========?:");
  //     this.setState({isLoggedIn: data.isLoggedIn});
  //   });
  // }

//this renders appropriate component if user is not logged in
  renderPage() {
    if (this.state.isLoggedIn === false) {
      return <Hero setUserId={this.setUserId}/>;
    } else {
      return <Carousel />;
    }
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
          isLoggedIn={this.state.isLoggedIn}
          verifyLogin={this.verifyLogin}
         />
        {this.renderPage()}
      </div>
    );
  }

}
export default App;
