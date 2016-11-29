import React, {Component} from 'react';
import AllGoals from './AllGoals.jsx';
import DailyGoals from './DailyGoals.jsx';
import Badges from './Badges.jsx';
import Dashboard from './Dashboard.jsx'

class Carousel extends Component {

  constructor(props){
    super(props);
    this.renderView = this.renderView.bind(this);
  }

  componentWillMount () {
    console.log("State of goals in carousel", this.props.goalList);
  }

  renderView(view) {
    if (view === "AllGoals"){
      // console.log("I made it into Carousel!!!!");
      return(<AllGoals updateBadge={this.props.updateBadge} updateGoalsIndex={this.props.updateGoalsIndex} goalList={this.props.goalList} update={this.props.update} className="component-render"/>);
    }
    if (view === "Badges"){
      return(<Badges badges={this.props.badges} goalList={this.props.goalList} className="component-render"/>);
    }
    if (view === "DailyGoals"){
      return(<DailyGoals className="component-render"/>);
    }
     if (view === "Dashboard"){
      return(<Dashboard name={this.props.name} goalList={this.props.goalList} className="component-render"/>);
    }
  }

  render() {

    return (
      <div>
        {this.renderView(this.props.view)}
      </div>
    );
  }

}
export default Carousel;

