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
    // this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    $.ajax({
      method: "get",
      url: "/api/daily_goals",
    }).done((response) => {
      this.setState({dailies: response.data});
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    $("#create-daily-goal-modal").modal();
    console.log("You clicked me! At least buy me dinner first! RUDE");
  }

  renderDailyGoals () {
    console.log("In renderDailyGoals===================================================")
    if(!this.state.dailies) {
      console.log("In the if statement of renderDailyGoals====================================================");
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
            return (
              <div className="daily-goals-template row well" key={index}>
                <div className="col-md-7">
                  <h1> {dailyGoal.name} </h1>
                </div>
                <div className="daily-goals-icons">
                  <i className="fa fa-check-square" aria-hidden="true" onClick={this.handleCheck}></i>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>
            );
          })}
          <div>
            <form className="daily-goals-form" onSubmit={this.handleSubmit}>
              <input type="submit" className="btn btn-default" value="Create A New Daily Goal!" />
            </form>
            <CreateDailyGoalModal />
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
