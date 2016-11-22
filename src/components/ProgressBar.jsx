import React, {Component} from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.calculateProgress = this.calculateProgress.bind(this);
  }

  // componentDidMount () {
  //   console.log("calculate progress in component did mount")
  //   this.calculateProgress();
  // }

  calculateProgress () {
    console.log("calculateProgress of progress bar");
    let tasks = this.props.taskArray.data;
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
    console.log("Rendering progress-bar");
    return (
      <div className="progress-bar progress-bar-info"
      role="progressbar"
      aria-valuenow="60"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{width: this.calculateProgress()}}>
      </div>
    )
  }
}

export default ProgressBar;