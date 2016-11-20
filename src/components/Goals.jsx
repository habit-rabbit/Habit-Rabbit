import React, {Component} from 'react';

class Goals extends Component {

  constructor(props){
    super(props);
    this.goalType = this.goalType.bind(this);
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

  render() {
    console.log("Rendering Carousel")
    console.log("???", this.props.goalInfo);
    let goal = this.props.goalInfo[0];
    console.log("MAYBE:???", goal.name);

    return (
      <div>
        {this.props.goalInfo.map((goal, index) => {
          return (
            <div className="goals-template" key={index}>
              <h1> {goal.name} </h1>
              {this.goalType(goal)}
              <div className="progress">
                <div className="progress-bar progress-bar-success" style={{width: "35%"}}>
                  <span className="sr-only">35% Complete (success)</span>
                </div>
                <div className="progress-bar progress-bar-warning progress-bar-striped" style={{width: "20%"}}>
                  <span className="sr-only">20% Complete (warning)</span>
                </div>
                <div className="progress-bar progress-bar-danger" style={{width: "10%"}}>
                  <span className="sr-only">10% Complete (danger)</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}
export default Goals;
