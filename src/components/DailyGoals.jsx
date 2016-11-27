import React, {Component} from 'react';
import Goals from './Goals.jsx';
import CreateTask from './CreateTask.jsx';
import CreateDailyGoalModal from './CreateDailyGoalModal.jsx';

class DailyGoals extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailies: [],
    }
    this.renderDailyGoals = this.renderDailyGoals.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateFromDatabase = this.updateFromDatabase.bind(this);
  }

  componentDidMount () {
    this.updateFromDatabase();
  }

  handleCheck (e, id) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: `/api/daily_goals/${id.id}/update`,
      data: {
        data: {
          is_done: true
        }
      }
    }).done(() => {
      this.updateFromDatabase ();
    });
  }

  handleDelete (e) {

  }

  handleSubmit(event) {
    event.preventDefault();
    $("#create-daily-goal-modal").modal();
  }

  updateFromDatabase () {
    $.ajax({
      method: "get",
      url: "/api/daily_goals",
    }).done((response) => {
      this.setState({dailies: response.data});
    });
  }

  renderDailyGoals () {
    if(!this.state.dailies) {
      return (
        <div>
          <h3> You don't have any daily goals yet! </h3>
          <h3> You should probably make one. </h3>
          <h3> Like brush your teeth? Maybe? I don't know your life. </h3>
          <h3> Figure it out. </h3>
        </div>
      );
    }
    else {
      return (
        <div>
          {this.state.dailies.map((dailyGoal, index) => {
            let goalClass = dailyGoal.is_done ? "goal-is-done" : "goal-not-done";
            return (
              <div className="daily-goals-template row well {goalClass}" key={index}>
                <div className="col-md-7">
                  <h1 className="daily-goal"> {dailyGoal.name} </h1>
                </div>
                <div className="col-md-5">
                  <div className="daily-goals-icons">
                    <i className="fa fa-check-square" aria-hidden="true" onClick={()=>{this.handleCheck(event, dailyGoal)}}></i>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <form className="daily-goals-form" onSubmit={this.handleSubmit}>
              <input type="submit" className="btn btn-default" value="Create A New Daily Goal!" />
            </form>
            <CreateDailyGoalModal updateDailies={this.updateFromDatabase}/>
          </div>
        </div>
      );
    }
  }

  render() {

    return (
      <div className="background-layout">
        <div className="container main-content">
          <h1 className="container-title">Daily Goals</h1>
          {this.renderDailyGoals()}
        </div>
      </div>
    );
  }

}
export default DailyGoals;
