import React, {Component} from 'react';
import SingleGoal from './SingleGoal.jsx'

class Goals extends Component {

  constructor(props){
    super(props);
    this.renderGoals = this.renderGoals.bind(this);
    this.state = {
      tasks: {},
      updating: false
    }
  }


  renderGoals () {

    if (!this.props.goalList) {
      return (
        <h3> Loading Goals... </h3>
      );
    } else {
      return (
        <div>
          {this.props.goalList.map((goal, index) => {
            // console.log("which goals are in here?", goal)
            let goalClass = goal.is_done ? "goal-is-done" : "goal-not-done"
            return (

              <div className="goals-template row well" key={index}>
               <SingleGoal updateBadge={this.props.updateBadge} update={this.props.update} goalClass={goalClass} goalInfo={goal} renderGoalInfoModal={this.renderGoalInfoModal}/>
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
