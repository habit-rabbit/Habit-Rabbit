import React, {Component} from 'react';
import ProgressBar from './ProgressBar.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class SingleGoal extends Component {

  constructor(props){
    super(props);
    this.getCurrentTask = this.getCurrentTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.updateCurrentTask = this.updateCurrentTask.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      showGoalinfo: false,
      goalInfo: "hide"
    }
  }
 //=================show-hide goal details===============================

  handleMouseEnter() {
    this.setState({goalInfo: "show"});
  }
  handleMouseLeave() {
    this.setState({goalInfo: "hide"});
  }

  renderGoalInfo() {
    let counter = 0;
    if(this.state.goalInfo === "show") {
      return( <div>
              <ReactCSSTransitionGroup
                transitionName="goalInfo"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
              <div className="goalInfo-content">
                  {this.props.goalInfo.tasks.map((task) => {
                    let taskClass = task.is_done ? "strikethrough" : "";
                    counter++;
                    return <p className={taskClass} key={counter}>{counter}: {task.name}  </p>
                  })}
              </div>
              </ReactCSSTransitionGroup>
            </div>
        );
    } else {
      return null;
    }
  }
  // ====================================================================
  //============== update database: goal.is_done = true==================
  updateGoal() {
    console.log("Goal completed, sending post request");
    setTimeout(() => {
      $.ajax({
        method: 'post',
        url: `/api/goals/${this.props.goalInfo.id}/update`,
        data: {
          data: {
            is_done: true
          }
        }
      }).then(() => {
        console.log("Post request finished, sending update to app");
        setTimeout(() => {
          this.props.update();
        }, 200);
      });
     }, 500);
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
        return (
          <div>
            <p className="tasks">{task.name}</p>
            <span>Finished already? </span>
             <button type="button" className="btn btn-default" aria-label="Checkbox" onClick={this.handleCheck} data-taskid={task.id}>
              <span className="glyphicon glyphicon-check" aria-hidden="true" data-taskid={task.id}></span>
            </button>
          </div>
        );
      }
  }

  handleCheck (e) {
    e.preventDefault();
    this.updateCurrentTask(this.props.goalInfo.id, e.target.dataset.taskid);
  }

  updateCurrentTask (goalId, taskId) {
   $.ajax({
      method: "post",
      url: `api/goals/${goalId}/tasks/${taskId}/update`,
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
          <h1> {this.props.goalInfo.name} </h1>


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
          <div className="row goalInfo">
            <div className="col-md-9 col-centered">
              <a href="#" className="goalInfo-toggle" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} > More Info </a>
              {this.renderGoalInfo()}
            </div>
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