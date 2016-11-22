import React, {Component} from 'react';
import SingleGoal from './SingleGoal.jsx'

class Goals extends Component {

  constructor(props){
    super(props);
    this.initializeGoalData = this.initializeGoalData.bind(this);
    this.state = {
      goals: [],
      tasks: {},
      userId: null,
      updating: false
    }
    this.initializeGoalData();
  }

  initializeGoalData () {

    $.ajax({
      method: "get",
      url: "/api/goals",
    }).done((data) => {
      console.log("DATA:", data);
      this.setState({goals: data});
    });
  }

  render() {
    console.log("Rendering Goals.jsx");
    console.log("this.state.goals:", this.state.goals);
    if (!this.state.goals.data) {
      console.log("in if statement of Goals.jsx");
      return (
        <h3> Loading Goals... </h3>
      )
    } else {
      console.log(this.state.goals.data);
      return (
        <div>
          {this.state.goals.data.map((goal, index) => {
            return (
              <div className="goals-template row " key={index}>
               <SingleGoal goalInfo={goal} />
              </div>
            )
          })}
        </div>
      );
    }
  }
}

export default Goals;
