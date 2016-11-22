import React, {Component} from 'react';

class GoalInfo extends Component {

  constructor(props) {
    super(props);

    this.goalType = this.goalType.bind(this);
    this.renderTaskTable = this.renderTaskTable.bind(this);
  }
  renderTaskTable(task) {
    return(<tr>
              <th scope="row">sdf</th>
              <td>sdf</td>
            </tr>);

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



  render() {
    return (
          <div className="col-md-3">
            <h1> {this.props.goalInfo.name} </h1>
            {this.goalType(this.props.goalInfo)}
            <table className="table table-sm table-inverse">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tasks.map( (task) => {
                  console.log(task, "task?")
                  return this.renderTaskTable(task);
                })}
              </tbody>
              </table>
          </div>
          );
  }

}
  export default GoalInfo;