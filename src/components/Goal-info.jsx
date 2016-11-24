import React, {Component} from 'react';

class GoalInfo extends Component {

  constructor(props) {
    super(props);

    this.goalType = this.goalType.bind(this);
    this.renderTaskTable = this.renderTaskTable.bind(this);
    this.hideGoalInfo = this.hideGoalInfo.bind(this);
  }
  renderTaskTable(task, id) {
    let strikethroughClass = task.is_done ? "strikethrough" : "";

    return(<tr key={id}>
              <th scope="row">{id}</th>
              <td className={strikethroughClass}>{task.name}</td>
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

  hideGoalInfo() {
    this.props.hideGoalInfo(false);
  }

  render() {
    console.log(this.props, "goal info ");
    let counter = 0;
    return (
          <div>
            <span onClick={this.hideGoalInfo}>{this.props.goalInfo.name}</span>
            <table className="table table-sm table-inverse" >
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