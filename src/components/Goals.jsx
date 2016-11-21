import React, {Component} from 'react';

class Goals extends Component {

  constructor(props){
    super(props);
    this.goalType = this.goalType.bind(this);
    // this.renderGoals = this.renderGoals.bind(this);

  }

  goalType (goal) {
    if(goal.private === false){
      return (
        <h4> Public </h4>
      )
    } else {
      return (
        <h4> Private </h4>
      )
    }
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
              <div className="goals-template row" key={index}>
                <div className="col-md-4">
                  <h1> {goal.name} </h1>
                  {this.goalType(goal)}
                </div>
                <div className="col-md-5">
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                    60%
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  {/*this.props.taskInfo.map((task, index) => {
                    return (
                      <p className="task" key={index}> {task.name} </p>
                    )
                  })*/}
                  <h4> Next Task: </h4>
                  <p>{this.props.taskInfo[0].name}</p>
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
