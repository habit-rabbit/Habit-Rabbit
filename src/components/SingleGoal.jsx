import React, {Component} from 'react';
import NextTask from './NextTask.jsx';
import ProgressBar from './ProgressBar.jsx';
import GoalInfo from './Goal-info.jsx';

class SingleGoal extends Component {

  constructor(props){
    super(props);
    this.getCurrentTask = this.getCurrentTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    this.goalType = this.goalType.bind(this);
    this.initializeTaskData = this.initializeTaskData.bind(this);
    this.setGoalInfo = this.setGoalInfo.bind(this);
    this.updateCurrentTask = this.updateCurrentTask.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.state = {
      userId: null,
      goalComplete: false,
      showGoalinfo: false,
      goalInfo: "show"
    }
  }

  initializeTaskData () {
    // console.log(this.props.goalInfo.name, "intializing goal")
    // $.ajax({
    //   method: "get",
    //   url: `/api/goals/${this.props.goalInfo.id}/tasks`
    // }).done((data) => {
    //   let tasks = data.data;
    //   tasks.sort((a, b) => {
    //     if (a.task_order > b.task_order) {
    //       return 1;
    //     }
    //     if (a.task_order < b.task_order) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    // });
  }
  componentWillMount() {
    // console.log(this.props.goalInfo.tasks, "props are and for goal", this.props.goalInfo)
    //   this.setState({tasks: this.props.goalInfo.tasks});

      // console.log("component mounted with props,", this.props.goalInfo.tasks)
  }
  componentDidMount() {
    // console.log("state of goal/**/, ", this.state.tasks)
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
  setGoalInfo(bool, showhide) {
    this.setState({
      showGoalinfo: bool,
      goalInfo: showhide
    });
  }
  updateGoal() {
    $.ajax({
      method: 'post',
      url: `/api/goals/${this.props.goalInfo.id}/update`,
      data: {
        data: {
          is_done : true
        }
      }
    }).then((data) => {
         this.setState({goalComplete: true});
         this.props.update();
    });
  }
  getCurrentTask () {
    let task = this.props.goalInfo.tasks.find((task) => {return !task.is_done});
    if (!task) {
      return <p> You've finished your goal! Rabeet is screeching with delight. </p>
    } else {
      return (  <div>
                  <p className="tasks">{task.name}</p>
                  <span>Finished already? </span>
                  <label>
                    <input data-taskId={task.id} onChange={this.handleCheck} type="checkbox"/>
                  </label>
                </div>)
    }
  }
  handleCheck (e) {
    debugger;
    e.preventDefault();
    this.setState({done: true});
    setTimeout(() => {
      this.setState({done: false});
    }, 200);
    this.updateCurrentTask(this.props.goalInfo.id, e.target.dataset.taskid);
  }

  updateCurrentTask (goalId, taskId) {
   $.ajax({
      method: "post",
      url: `api/goals/${goalId}/tasks/${taskId}/update`,
      data: {is_done: true}
    }).done((data) => {
      this.props.update();
      //need to update state of App here.
      // this.initializeTaskData();
    });
  }

  renderGoals() {
    if(!this.props.goalInfo.tasks) {
      return (
        <div> {/*this should render as an error message (the one we get back from the server*/}
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


  render() {
    console.log("Rendering SingleGoal.jsx");
    // console.log(this.state.tasks, "tasks are for goal," , this.props.goalInfo.name)
    return (
      <div>
       {this.renderGoals()}
      </div>
    );
  }

}

export default SingleGoal;