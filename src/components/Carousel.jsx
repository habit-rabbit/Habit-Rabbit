import React, {Component} from 'react';
import AllGoals from './AllGoals.jsx';
import DailyGoals from './DailyGoals.jsx';
import Badges from './Badges.jsx';


class Carousel extends Component {

  constructor(props){
    super(props);
    this.renderView = this.renderView.bind(this);
  }

  renderView(view) {
    if (view === "AllGoals"){
      console.log("I made it into Carousel!!!!");
      return(<AllGoals goalList={this.props.goalList} />);
    }
    if (view === "Badges"){
      return(<Badges />);
    }
    if (view === "DailyGoals"){
      return(<DailyGoals />);
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

