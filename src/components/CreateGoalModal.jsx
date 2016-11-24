import React, {Component} from 'react';
// import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

import Nav from './Nav.jsx';


class CreateGoalModal extends Component {
  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      goalName: "",
      private: true,
      tasks: [""],
      goalNameErr: "",
      taskNameErr: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForms = this.renderForms.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.validateFormInputs = this.validateFormInputs.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.submitToDatabase = this.submitToDatabase.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;
    console.log("THIS STAAATE", this.state)
    this.setState({goalName: value});
  }

 handleSubmit(event) {
  event.preventDefault();
  this.validateFormInputs(this.submitToDatabase);
  }

  submitToDatabase(goal, tasks) {
    $.ajax({
      method: 'post',
      url: '/api/goals/create',
      dataType: 'json',
      data: {
        data: {
          name: goal,
          private: this.state.private,
        }
      }
    }).done ((data) => {
      $.ajax({
        method: 'post',
        url: `/api/goals/${data.data[0].id}/tasks/create`,
        dataType: 'json',
        data: {
          data: {
            taskNames: tasks,
          }
        }
      }).done ((data) => {
        this.setState({goalName: ""});
        this.setState({tasks: [""]});
        this.setState({goalNameErr: ""});
        $("#create-goal-modal").modal("hide");
        this.props.updateGoalsIndex();
      });
    });
  }

  updateTask(event, index) {
    let value = event.target.value;
    let tasks = this.state.tasks;
    tasks[index] = value;
    this.setState({tasks: tasks});
  }

  renderForms() {
    return this.state.tasks.map((item, index) => {
      return <input type="text" value={item} onChange={ (e) => {this.updateTask(e, index)} } name={`task-name-${index}`} key={index} placeholder="Task Name"/>
    })
  }

  handleAddTask() {
    let tasks = this.state.tasks;
    tasks.push("");
    this.setState({tasks: tasks});
    console.log("IM A COOL TASK")
  }

  validateFormInputs(cb) {
    console.log("SUP WITH THE STATE", this.state.tasks)
    if (this.state.goalName === "") {
      this.setState({goalNameErr: "Goal Name can't be blank, Frank!"});
    }
    let tasks = this.state.tasks;
    let cleanTasks = tasks.filter(Boolean);
    console.log("CLEAN ME UP BUTTERCUP", cleanTasks)
    if (this.state.goalNameErr === "") {
      cb(this.state.goalName, cleanTasks);
    }
  }

  renderErrors() {
    if (this.state.goalNameErr !== "") {
      return (
        <div className="alert alert-warning">
          {this.state.goalNameErr}
        </div>
      )
    }
    // this.setState({goalNameErr: ""});
  }


  render() {
    console.log("WHERE MY GOAAAAAL NAAAAME ERRRRR  MESSAGE AT", this.state.goalNameErr)

    return (
      <div className="modal fade" id="create-goal-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h1 className="modal-title" id="myModalLabel">Create Your New Goal</h1>
            </div>

            <div id="create-goal-body" className="modal-body">
            {this.renderErrors()}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <input id="goal-name" type="text" value={this.state.goalName} onChange={this.handleChange} name="goalName" placeholder="Goal Name"/>
              </div>


              <div className="form-group">
              {this.renderForms()}
              </div>

              <button type="button" className="btn btn-default btn-lg" name="add-task" data-toggle="popover" onClick={this.handleAddTask}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>

              <div className="form-group">
                <input type="submit" name="create-goal" className="btn btn-default" value="Create Goal!" />
              </div>

            </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default CreateGoalModal