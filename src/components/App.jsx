import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Carousel from './Carousel.jsx';
import Hero from './Hero.jsx';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      isLoggedIn: false,
      goals: [],
    }
    // this.setUserId = this.setUserId.bind(this);
    // this.getUserId = this.getUserId.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.updateFromDatabase = this.updateFromDatabase.bind(this);

    this.updateFromDatabase();
  }

  componentWillMount(){
    this.verifyLogin();
  }

  updateFromDatabase () {
    console.log("Calling DB from App");
    $.ajax({
      method: "get",
      url: "/api/goals",
    }).done((response) => {
      console.log("Finished DB call in App");
      this.setState({goals: response.data});
    });
  }

  verifyLogin(){
    $.ajax({
      method: "get",
      url: "/login",
      dataType: 'json'
    }).done((data) => {
      console.log("Am I logged in?:", data);
      this.setState({isLoggedIn: data.isLoggedIn, name: data.name});
      this.updateFromDatabase();
    });
  }

//this renders appropriate component if user is not logged in
  renderPage() {
    if (this.state.isLoggedIn === false) {
      return <Hero setUserId={this.setUserId} verifyLogin={this.verifyLogin}/>;
    } else {
      return <Carousel goalList={this.state.goals} update={this.updateFromDatabase}/>;
    }
  }

  // setUserId(userId) {
  //   this.setState({userId: userId});
  // }

  // getUserId(userId) {
  //   return this.state.userId;
  // }

  render() {
    console.log("Rendering <App/>");
    // console.log("user id is:", this.state.userId)
    return (
      <div className="wrapper">
        <Nav
          name={this.state.name}
          isLoggedIn={this.state.isLoggedIn}
          verifyLogin={this.verifyLogin}
          updateGoalsIndex={this.updateFromDatabase}
         />
        {this.renderPage()}
      </div>
    );
  }

}
export default App;
