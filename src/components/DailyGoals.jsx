import React, {Component} from 'react';
import Goals from './Goals.jsx';
import CreateTask from './CreateTask.jsx';

class DailyGoals extends Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="background-layout">
        <div className="container main-content">
          <h1 className="container-title">Daily Goals</h1>
        </div>
      </div>
    );
  }

}
export default DailyGoals;
