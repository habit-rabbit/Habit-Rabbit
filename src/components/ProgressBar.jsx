import React, {Component} from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.calculateProgress = this.calculateProgress.bind(this);
  }

  componentWillMount() {
    this.calculateProgress();
  }

  // componentWillUpdate() {
  //   this.calculateProgress();
  // }
  calculateProgress () {
    let tasks = this.props.taskArray;
    let finishedTasks = 0;
    for (let i = 0; i < tasks.length; i++){
      if (tasks[i].is_done === true) {
        finishedTasks++;
      }
    }
    let progPercent = Math.round((finishedTasks / tasks.length) * 100);
    let formatProgress = progPercent.toString() + "%";
    return formatProgress;
  }

  render () {
    return (
      <div className="progress-bar progress-bar-info"
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{width: this.calculateProgress()}}>
      </div>
    )
  }
}

export default ProgressBar;