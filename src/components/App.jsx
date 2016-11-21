import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Goals from './Goals.jsx';
import Carousel from './Carousel.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      goals: [],
      users: [],
      tasks: [],
    }
    this.queryDatabase = this.queryDatabase.bind(this);
  }

  componentWillMount () {

    let goals = $.ajax({
      method: "get",
      url: "/api/goals",
    }).done((data) => {
      console.log(data)
      this.setState({goals: data});
    });

    let tasks = $.ajax({
      method: "get",
      url: "/api/goals/5/tasks"
    }).done((data) => {
      console.log(data)
      this.setState({tasks: data});
    });
  }

  // componentDidMount () {
  //   let goals = $.ajax({
  //     method: "get",
  //     url: "/api/goals",
  //   }).done((data) => {
  //     console.log(data)
  //     this.setState({goals: data});
  //   });

  //   let tasks = $.ajax({
  //     method: "get",
  //     url: "/api/goals/5/tasks"
  //   }).done((data) => {
  //     console.log(data)
  //     this.setState({tasks: data});
  //   });
  // }

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

  render() {
    console.log("Rendering <App/>");

    return (
      <div className="wrapper">
        <Nav />
        <Carousel
          goalInfo={this.state.goals}
          taskInfo={this.state.tasks}
        />
      </div>
    );
  }

}
export default App;
