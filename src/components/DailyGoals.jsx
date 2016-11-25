import React, {Component} from 'react';
import Goals from './Goals.jsx';
import CreateTask from './CreateTask.jsx';

class DailyGoals extends Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="container main-content">
        <h1>Daily Goals</h1>
      </div>
    );
  }

}
export default DailyGoals;
