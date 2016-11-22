import React, {Component} from 'react';

class NextTask extends Component {
  constructor (props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.state = {
      done: false
    }
  }

  handleCheck (e) {
    e.preventDefault();
    this.setState({done: true});
    console.log("In handleCheck of NextTask");
    setTimeout(() => {
      this.setState({done: false});
    }, 200);
    this.props.updateCurrentTask(this.props.goalInfo.id, this.props.taskInfo.id);
  }

  render () {
    console.log("Rendering NextTask.jsx");
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

export default NextTask;

