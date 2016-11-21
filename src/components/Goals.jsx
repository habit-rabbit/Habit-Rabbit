import React, {Component} from 'react';

class Goals extends Component {

  constructor(props){
    super(props);
    this.goalType = this.goalType.bind(this);
    this.renderGoals = this.renderGoals.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.getCurrentTask = this.getCurrentTask.bind(this);
    this.state = {
      goals: [],
      tasks: [],
      userId: null
    }

  }

  componentWillMount () {

  let goals = $.ajax({
    method: "get",
    url: "/api/goals",
  }).done((data) => {
    console.log("DATA:",data);
    this.setState({goals: data});
  });

  let tasks = $.ajax({
    method: "get",
    url: "/api/goals/5/tasks"
  }).done((data) => {
    console.log(data);
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

  }

  updateTask () {
    console.log("You checked a checkbox! Look at you go!");
    // needs an ajax call to update the task table (is_done = true)
  }

  renderGoals() {
    console.log("Rendering <Goals/>");
    console.log(this.state);
    if(this.state.goals.length === 0) {
      console.log("if" +this.state.goals);
      return (
        <div>
          Goals Loading...
        </div>
      )
    } else {
      console.log("else" +this.state.goals);
      return(
        <div>
          {console.log(this.state, "these r thr props")}
          {this.state.goals.data.map((goal, index) => {
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
                  <p>{this.state.tasks.data[0].name}</p>
                  <span>Finished already? </span>
                    <label>
                      <input type="checkbox" onChange={this.updateTask}/>
                    </label>
                </div>
              </div>
            )
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
       {this.renderGoals()}
      </div>
    );
  }

}

export default Goals;
