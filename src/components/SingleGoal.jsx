import React, {Component} from 'react';
import ProgressBar from './ProgressBar.jsx';
import GoalInfo from './Goal-info.jsx';

class SingleGoal extends Component {

  constructor(props){
    super(props);
    this.getCurrentTask = this.getCurrentTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.goalType = this.goalType.bind(this);
    this.setGoalInfo = this.setGoalInfo.bind(this);
    this.updateCurrentTask = this.updateCurrentTask.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.state = {
      showGoalinfo: false,
      goalInfo: "show"
    }
  }
 //=================show-hide goal details===============================
  goalType (goal) {
    if(goal.private === false){
      return (
        <h4 className="goal-type"> Challenge </h4>
      )
    } else {
      return (
        <h4 className="goal-type"> Private </h4>
      )
    }
  }
  setGoalInfo(bool, showhide) {
    this.setState({
      showGoalinfo: bool,
      goalInfo: showhide
    });
  }
  // ====================================================================
  //============== update database: goal.is_done = true==================
  updateGoal() {
    // setTimeout(() => {
      $.ajax({
        method: 'post',
        url: `/api/goals/${this.props.goalInfo.id}/update`,
        data: {
          data: {
            is_done: true
          }
        }
      }).then(() => {
        this.props.update();
      });
     // }, 200);
  }

  //==============================For Tasks==============================
  getCurrentTask () {
    let task = this.props.goalInfo.tasks.find((task) => {return !task.is_done});
    //if task is undefined, it means there are no more tasks to complete
    //at this point we update the goal and set its is_done flag to true
    if (!task) {
        if(!this.props.goalInfo.is_done) {
          this.updateGoal();
        }
        return <p> You've finished your goal! Rabeet is screeching with delight. </p>
    } else {
      console.log("=======TASK ID IN GET CURRENT TASK IS ===============", task.id);
      return (  <div>
                  <p className="tasks">{task.name}</p>
                  <span>Finished already? </span>
                   <button type="button" className="btn btn-default" aria-label="Checkbox" onClick={this.handleCheck} data-taskid={task.id}>
                   {console.log("=====================TASK ID IN RENDER FUNCTION ============", task.id)}
                    <span className="glyphicon glyphicon-check" aria-hidden="true" data-taskid={task.id}></span>
                  </button>
                  {/*<label>
                    <input data-taskId={task.id} onChange={this.handleCheck} type="checkbox"/>
                  </label>*/}
                </div>)
    }
  }

  handleCheck (e) {
    console.log("Got to handleCheck in SingleGoal");
    e.preventDefault();
    console.log("================SETTING STATE IN HANDLE CHECK", e.target.dataset.taskid);
    console.log(e.target.dataset);
    // setTimeout(() => {
    // }, 200);
    this.updateCurrentTask(this.props.goalInfo.id, e.target.dataset.taskid);
  }

  updateCurrentTask (goalId, taskid) {
    console.log("Wandered into updateCurrentTask");
    console.log("goalId is " + goalId + " taskid is " +  taskid );
   $.ajax({
      method: "post",
      url: `api/goals/${goalId}/tasks/${taskid}/update`,
      data: {is_done: true}
    }).done((data) => {
      this.props.update();
    });
  }
//========================================================================
//===========================Render the goal component====================
  renderGoals() {
    if(!this.props.goalInfo.tasks) {
      return (
        <div>
          <h3>Let's talk about tasks... </h3>
          <h3>YOU NEED TO MAKE SOME. </h3>
          <h3>HOW DO YOU EVEN EXPECT TO ACCOMPLISH YOUR DREAMS WITHOUT A PLAN, BARBARA.</h3>
        </div>
      );
    } else {
      return(
        <div className={this.props.goalClass}>
          <div className="col-md-3">
          <span onClick={()=>{ this.state.showGoalinfo ? this.setGoalInfo(false, "show") : this.setGoalInfo(true, "hide")} }>{this.state.goalInfo}</span>
            {this.state.showGoalinfo ? <GoalInfo goalInfo={this.props.goalInfo} /> : <h1 onClick={this.showGoalinfo}> {this.props.goalInfo.name} </h1>}


          </div>
          <div className="col-md-6">
            <div className="progress">
              <ProgressBar
              taskArray={this.props.goalInfo.tasks}/>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="task-list"> Next Task: </h4>
            {this.getCurrentTask()}
          </div>

        </div>
      );
    }
  }
//========================================================================

  render() {
    return (
      <div>
       {this.renderGoals()}
      </div>
    );
  }

}

export default SingleGoal;