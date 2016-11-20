import React, {Component} from 'react';
import Nav from './Nav.jsx';
import Goals from './Goals.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      goals: [],
      users: [],
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

  render() {
    console.log("Rendering <App/>");

    return (
      <div className="wrapper">
        <Nav />
        <Goals goalInfo={this.state.goals}/>
      </div>
    );
  }

}
export default App;
