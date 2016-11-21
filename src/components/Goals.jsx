import React, {Component} from 'react';

class Goals extends Component {

  constructor(props){
    super(props);
    this.goalType = this.goalType.bind(this);
    // this.renderGoals = this.renderGoals.bind(this);
    this.updateTask = this.updateTask.bind(this);

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

  updateTask () {
    console.log("You checked a checkbox! Look at you go!");
    // needs an ajax call to update the task table (is_done = true)
  }

  renderGoals() {
    console.log("Rendering <Goals/>");
    if(this.props.goalInfo === undefined) {
    console.log("if" +this.props.goalInfo)
      return (
        <div>
          Goals Loading...
        </div>
      )
    } else {
      console.log("else" +this.props.goalInfo)
      return(
        <div>
          {console.log(this.props, "these r thr props")}
          {this.props.goalInfo.map((goal, index) => {
            console.log("GOOOOOOAAAAALLLLLL " + goal)
            return (
              <div className="goals-template row " key={index}>
                <div className="col-md-3">
                  <h1> {goal.name} </h1>
                  {this.goalType(goal)}
                </div>
                <div className="col-md-6">
                  <div className="progress">
                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "20%"}}>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  {/*this.props.taskInfo.map((task, index) => {
                    return (
                      <p className="task" key={index}> {task.name} </p>
                    )
                  })*/}
                  <h4 className="task-list"> Next Task: </h4>
                  <p>{this.props.taskInfo[0].name}</p>
                  <span>Finished already? </span>
                  {/*<div className="checkbox">}*/}
                    <label>
                      <input type="checkbox" onChange={this.updateTask}/>
                    </label>
                  {/*</div>*/}
                </div>
              </div>
            )
          })}
        </div>
      );
    }
  }

  render() {
    // console.log (this.props.goalInfo.data)
    return (
      <div>
       {this.renderGoals()}
      </div>
    );
  }

}

export default Goals;
