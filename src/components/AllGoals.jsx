import React, {Component} from 'react';
import Goals from './Goals.jsx';
import CreateTask from './CreateTask.jsx';
import CreateGoalModal from './CreateGoalModal.jsx';


class AllGoals extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "goal-name") {
      this.setState({name: value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    $("#create-goal-modal").modal();
  }

  render() {

    return (
      <div className="background-layout">
        <div className="container main-content">
          <div className="page-header">
            <h1>Your Goals</h1>
            <form className="create goal" onSubmit={this.handleSubmit} >
              <input type="submit" id="new-goal-button" className="btn btn-default"  value="Create A New Goal!"/>
            </form>
            <CreateGoalModal goalName={this.state.name} updateGoalsIndex={this.props.updateGoalsIndex}/>
          </div>
          <Goals updateBadge={this.props.updateBadge} update={this.props.update} goalList={this.props.goalList} goalsAreCurrent={this.props.goalsAreCurrent} setAppGoalsDefault={this.props.setAppGoalsDefault}/>
        </div>
      </div>
    );
  }

}
export default AllGoals;
