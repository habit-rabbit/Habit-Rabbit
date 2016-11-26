import React, {Component} from 'react';
import Goals from './Goals.jsx';
import CreateTask from './CreateTask.jsx';

class DailyGoals extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailies: [],
    }
    this.renderDailyGoals = this.renderDailyGoals.bind(this);
  }

  componentDidMount () {
    $.ajax({
      method: "get",
      url: "/api/daily_goals",
    }).done((response) => {
      this.setState({dailies: response.data});
    });
  }

  renderDailyGoals () {
    console.log("In renderDailyGoals===================================================")
    if(!this.state.dailes) {
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
