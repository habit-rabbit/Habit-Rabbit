import React, {Component} from 'react';
import SingleGoal from './SingleGoal.jsx'

class Goals extends Component {

  constructor(props){
    super(props);
    this.initializeGoalData = this.initializeGoalData.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.state = {
      goals: {},
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

  renderGoals () {
    console.log("Rendering Goals.jsx");
    console.log("this.state.goals:", this.state.goals);
    if (!this.state.goals.data) {
      console.log("in if statement of Goals.jsx");
      return (
        <h3> Loading Goals... </h3>
      );
    } else if (this.state.goals.data.length === 0) {
      console.log("in else if statement of goals.jsx");
      return (
        <div>
          <h3> You haven't created any goals yet!</h3>
          <h3>WHAT ARE YOU EVEN DOING HERE?!?</h3>
          <h3>GET ON IT.</h3>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.goals.data.map((goal, index) => {
            return (
              <div className="goals-template row well" key={index}>
               <SingleGoal goalInfo={goal} />
              </div>
            )
          })}
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderGoals()}
      </div>
    );
  }
}

export default Goals;
