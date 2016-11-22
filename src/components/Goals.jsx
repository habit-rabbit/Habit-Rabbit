import React, {Component} from 'react';
import SingleGoal from './SingleGoal.jsx'

class Goals extends Component {

  constructor(props){
    super(props);
    // this.goalType = this.goalType.bind(this);
    // this.renderGoals = this.renderGoals.bind(this);
    // this.updateTask = this.updateTask.bind(this);
    // this.getCurrentTask = this.getCurrentTask.bind(this);
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

  // goalType (goal) {
  //   if(goal.private === false){
  //     return (
  //       <h4 className="goal-type"> Challenge </h4>
  //     )
  //   } else {
  //     return (
  //       <h4 className="goal-type"> Private </h4>
  //     )
  //   }
  // }

  // getCurrentTask () {
  //   console.log("GETTING CURRENT TASK");
  //   function findNextTask(task) {
  //     return !task.is_done
  //   }
  //   let taskName = this.state.tasks.data.find(findNextTask);
  //   console.log("getCurrentTaskResult:", taskName.name);
  //   return taskName;
  // }

  // updateTask (goalId, taskId) {
  //   // console.log("You checked a checkbox! Look at you go!");
  //   console.log("SENDING TASK UPDATE");
  //   console.log(`Goal id: ${goalId}, task id: ${taskId}`);
  //   let taskUpdate = $.ajax({
  //     method: "post",
  //     url: `api/goals/${goalId}/tasks/${taskId}/update`,
  //     data: {is_done: true}
  //   }).done((data) => {
  //     this.value = false;
  //     this.initializeGoalData();
  //   })
  // }

  // renderGoals() {
  //   console.log("Rendering <Goals/>");
  //   console.log("State Tasks:", this.state.tasks);
  //   if(this.state.goals.length === 0) {
  //     console.log("if" +this.state.goals);
  //     return (
  //       <div>
  //         Goals Loading...
  //       </div>
  //     )
  //   } else {
  //     console.log("else" +this.state.goals);
  //     return(
  //       <div>
  //         {this.state.goals.data.map((goal, index) => {
  //           return (
  //             <div className="goals-template row " key={index}>
  //               <div className="col-md-3">
  //                 <h1> {goal.name} </h1>
  //                 {this.goalType(goal)}
  //               </div>
  //               <div className="col-md-6">
  //                 <div className="progress">
  //                   <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="col-md-3">
  //                 <h4 className="task-list"> Next Task: </h4>
  //                 <p>{this.getCurrentTask().name}</p>
  //                 <span>Finished already? </span>
  //                   <label>
  //                     <input type="checkbox" onChange={()=>{this.updateTask(goal.id, this.getCurrentTask().id)}}/>
  //                   </label>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     );
  //   }
  // }

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
