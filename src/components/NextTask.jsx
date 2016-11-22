import React, {Component} from 'react';

class NextTask extends Component {
  constructor (props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.state = {
      done: false
    }
  }

  handleCheck (e) {
    e.preventDefault();
    this.setState({done: true});
    setTimeout(() => {
      this.setState({done: false});
    }, 200);
    this.props.updateCurrentTask(this.props.goalInfo.id, this.props.taskInfo.id);
  }

  renderTasks () {
    if (this.props.goalComplete){
      return (
        <p> You've finished your goal! Rabeet is screeching with delight. </p>
      );
    } else {
      return (
        <div>
          <p>{this.props.taskInfo.name}</p>
          <span>Finished already? </span>
          <label>
            <input type="checkbox" onChange={this.handleCheck} checked={this.state.done}/>
          </label>
        </div>
      );
    }
  }

  render () {
    console.log("Rendering NextTask.jsx");
    return (
      <div>
        {this.renderTasks()}
      </div>
    );
  }
}

export default NextTask;

