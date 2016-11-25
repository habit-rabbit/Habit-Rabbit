import React, {Component} from 'react';
import Goals from './Goals.jsx';
import CreateTask from './CreateTask.jsx';

class AllGoals extends Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="container main-content">
        <h1 className="container-title"> ~ Your Current Goals ~ </h1>
        <Goals update={this.props.update} goalList={this.props.goalList} goalsAreCurrent={this.props.goalsAreCurrent} setAppGoalsDefault={this.props.setAppGoalsDefault}/>
      </div>

    );
  }

}
export default AllGoals;
