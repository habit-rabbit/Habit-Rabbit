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
        <h5> Public </h5>
      )
    } else {
      return (
        <h5> Private </h5>
      )
    }
  }

  renderGoals() {
    if(this.props.goalInfo == false) {
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
          {this.props.goalInfo.data.map((goal, index) => {
            console.log("GOOOOOOAAAAALLLLLL " + goal)
            return (
              <div className="goals-template" key={index}>
                <h1> {goal.name} </h1>
                {this.goalType(goal)}
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
                    60%
                  </div>
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
