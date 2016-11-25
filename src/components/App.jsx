import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
      view: "AllGoals",
    }
    // this.setUserId = this.setUserId.bind(this);
    // this.getUserId = this.getUserId.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.updateFromDatabase = this.updateFromDatabase.bind(this);
    this.setView = this.setView.bind(this);


    this.updateFromDatabase();
  }

  componentWillMount(){
    this.verifyLogin();
  }

  setView(view){
    if (view === 1){
      this.setState({view: "AllGoals"});
    }
    if (view === 2){
      this.setState({view: "DailyGoals"});
    }
    if (view === 3){
      this.setState({view: "Badges"});
    }
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
      return (
        <ReactCSSTransitionGroup
          transitionName="background"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          <Carousel goalList={this.state.goals} view={this.state.view} key={this.state.view}/>
        </ReactCSSTransitionGroup>);
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
          setView={this.setView}
         />
        {this.renderPage()}
      </div>
    );
  }

}
export default App;
