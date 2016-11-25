import React, {Component} from 'react';
import SingleGoal from './SingleGoal.jsx'

class Goals extends Component {

  constructor(props){
    super(props);
    // this.initializeGoalData = this.initializeGoalData.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.state = {
      tasks: {},
      updating: false
    }
    // this.initializeGoalData();
  }

  // componentWillMount () {
  //   console.log("componentWillMount=========================");
  //   $.ajax({
  //     method: "get",
  //     url: "/api/goals",
  //   }).done((data) => {
  //     console.log("===================DATA:=====================", data);
  //     this.setState({goals: data});
  //     this.props.setAppGoalsDefault();
  //   });
  // }

  renderGoals () {
    console.log("Rendering Goals.jsx");
    console.log("this.props.goallist:", this.props.goalList);

    if (!this.props.goalList) {
      console.log("in if statement of Goals.jsx");
      return (
        <h3> Loading Goals... </h3>
      );
    } else if (this.props.goalList.length === 0) {
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
          {this.props.goalList.map((goal, index) => {
            let goalClass = goal.is_done ? "goal-done" : "goal-not-done"
            return (
              <div className="goals-template row well" key={index}>
               <SingleGoal update={this.props.update} goalClass={goalClass} goalInfo={goal} renderGoalInfoModal={this.renderGoalInfoModal}/>
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
