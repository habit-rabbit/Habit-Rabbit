import React, {Component} from 'react';

class SingleGoal extends Component {

  constructor(props){
    super(props);
    this.initializeTaskData = this.initializeTaskData.bind(this);
    this.goalType = this.goalType.bind(this);
    this.getCurrentTask = this.getCurrentTask.bind(this);
    this.updateCurrentTask = this.updateCurrentTask.bind(this);
    this.state = {
      tasks: {},
      currentTask: {},
      userId: null,
      updating: false
    }
    this.initializeTaskData();
  }

  initializeTaskData () {
    $.ajax({
      method: "get",
      url: "/api/goals/5/tasks"
    }).done((data) => {
      console.log(data);
      let tasks = data.data;
      tasks.sort((a, b) => {
        if (a.task_order > b.task_order) {
          return 1;
        }
        if (a.task_order < b.task_order) {
          return -1;
        }
        return 0;
      });
      console.log("SORTED TASKS:", tasks);
      this.setState({tasks: data});
    });
  }

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

  getCurrentTask () {
    console.log("GETTING CURRENT TASK");
    function findNextTask(task) {
      return !task.is_done
    }
    let taskName = this.state.tasks.data.find(findNextTask);
    console.log("getCurrentTaskResult:", taskName.name);
    return taskName;
  }

  updateCurrentTask (goalId, taskId) {
    // console.log("You checked a checkbox! Look at you go!");
    console.log("SENDING TASK UPDATE");
    console.log(`Goal id: ${goalId}, task id: ${taskId}`);
    let taskUpdate = $.ajax({
      method: "post",
      url: `api/goals/${goalId}/tasks/${taskId}/update`,
      data: {is_done: true}
    }).done((data) => {
      console.log("In .done of updateCurrentTaskf");
      this.initializeTaskData();
      // this.setState({updating: true});
      // let taskUpdate = this.getCurrentTask();
    });
  }

  renderGoals() {
    console.log("In renderGoals function of SingleGoal ");
    console.log("State Tasks:", this.state.tasks);
    if(!this.state.tasks.data) {
      console.log("if" +this.state.tasks);
      return (
        <div>
          Goals Loading...
        </div>
      )
    } else {
      console.log("else" +this.state.tasks);
      return(
        <div>
          <div className="col-md-3">
            <h1> {this.props.goalInfo.name} </h1>
            {this.goalType(this.props.goalInfo)}
          </div>
          <div className="col-md-6">
            <div className="progress">
              <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="task-list"> Next Task: </h4>
            <p>{this.getCurrentTask().name}</p>
            <span>Finished already? </span>
            <label>
              <input type="checkbox" onChange={()=>{this.updateCurrentTask(this.props.goalInfo.id, this.getCurrentTask().id)}}/>
            </label>
          </div>
        </div>
      );
    }
  }


  render() {
    console.log("Rendering SingleGoal.jsx");
    return (
      <div>
       {this.renderGoals()}
      </div>
    );
  }

}

export default SingleGoal;