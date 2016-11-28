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

  handleCheck (e, dailyGoal) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: `/api/daily_goals/${dailyGoal.id}/update`,
      data: {
        data: {
          is_done: true
        }
      }
    }).done(() => {
      this.updateFromDatabase ();
    });
  }

  handleDelete (e, dailyGoal) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: `/api/daily_goals/${dailyGoal.id}/delete`,
      data: {
        data: {
          id: dailyGoal.id
        }
      }
    }).done(() => {
      this.updateFromDatabase();
    });
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
      console.log(response);
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
              <div className="daily-goals-template row well" key={index}>
                <div className={goalClass}>
                  <div className="col-md-7">
                    <h1 className="daily-goal"> {dailyGoal.name} </h1>
                  </div>
                  <div className="col-md-5">
                    <div className="daily-goals-icons">
                      <button type="button" className="btn btn-default" aria-label="Checkbox" onClick={()=>{this.handleCheck(event, dailyGoal)}}>
                        <span className="glyphicon glyphicon-check" aria-hidden="true"></span>
                      </button>
                      <button type="button" className="btn btn-default" aria-label="Trash" onClick={()=>{this.handleDelete(event, dailyGoal)}}>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true" ></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  render() {

    return (
      <div className="background-layout">
        <div className="container main-content">
          <div className="page-header">
            <h1>Daily Reminders</h1>
             <form className="create daily" onSubmit={this.handleSubmit}>
              <input type="submit" className="btn btn-default" value="Create A New Daily Reminder!" />
            </form>
            <CreateDailyGoalModal updateDailies={this.updateFromDatabase}/>
          </div>
          {this.renderDailyGoals()}
        </div>
      </div>
    );
  }

}
export default DailyGoals;
