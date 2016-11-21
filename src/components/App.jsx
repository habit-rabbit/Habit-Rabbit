import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Goals from './Goals.jsx';
import Hero from './Hero.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      goals: [],
      users: [],
      isLoggedIn: false
    }
    this.queryDatabase = this.queryDatabase.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentWillMount () {
    let goals = $.ajax({
            method: "get",
            url: "/api/goals",
          }).done((data) => {
            console.log(data)
            this.setState({goals: data});
          });
  }

  queryDatabase(data, queryType) {
    let queryData = data;
    console.log("queryDatabase");
    data.forEach((goal) => {
      // console.log(goal);
    });
    if (queryType === "goals") {
      this.setState({goals: data});
      console.log("STATE:", this.state.goals);
    } else if (queryType === "users") {
      this.setState({users: data});
    }
  }

//THIS LOGIC IS IN BETA TESTING - cecia and nat were attempting to get login routes working
    loggedIn() {
      if (this.state.isLoggedIn) {
        return <Goals goalInfo={this.state.goals}/>
      } else {
        return <Hero />
      }
    }

  render() {
    console.log("Rendering <App/>");


    return (
      <div className="wrapper">
        <Nav />
        {this.loggedIn()}
      </div>
    );
  }

}
export default App;
