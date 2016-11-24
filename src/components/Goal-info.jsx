import React, {Component} from 'react';

class GoalInfo extends Component {

  constructor(props) {
    super(props);

    this.goalType = this.goalType.bind(this);
    this.renderTaskTable = this.renderTaskTable.bind(this);
  }
  renderTaskTable(task, id) {
    return(<tr key={id}>
              <th scope="row">{id}</th>
              <td>{task.name}</td>
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
    let counter = 0;
    return (
          <div className="col-md-3">
            <table className="table table-sm table-inverse" onClick={this.props.hideGoalInfo}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                </tr>
              </thead>
              <tbody>
                {this.props.tasks.map( (task) => {
                  counter++;
                  return this.renderTaskTable(task, counter);
                })}
              </tbody>
              </table>
          </div>
          );
  }

}
  export default GoalInfo;