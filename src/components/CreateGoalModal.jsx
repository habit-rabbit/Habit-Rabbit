import React, {Component} from 'react';
import Nav from './Nav.jsx';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';


class CreateGoalModal extends Component {
  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      goalName: this.props.goalName,
      private: true,
      tasks: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;
    // console.log("THIS STAAATE", this.state)
    if (id === "goal-name") {
      this.setState({goalName: value});
    }
    if (id === "task") {
      this.setState({tasks: value});
    }
  }

 handleSubmit(event) {
    event.preventDefault();

    $.ajax({
      method: 'post',
      url: '/api/goals/create',
      dataType: 'json',
      data: {
        data: {
          name: "Literally satan",
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
            taskName: this.state.tasks
          }
        }
      }).done ((data) => {
        $("#create-goal-modal").modal("hide");
        this.props.updateGoalsIndex();
      });
    });
  }

  render() {

    return (
      <div className="modal fade" id="create-goal-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h1 className="modal-title" id="myModalLabel">Create Your New Goal</h1>
            </div>

            <div id="create-goal-body" className="modal-body">
            <form onSubmit={this.handleSubmit}>

              <div className="form-group">
                <input id="goal-name" type="text" value={this.props.goalName} onChange={this.handleChange} name="goalName" placeholder="Goal Name"/>
              </div>

              <div className="form-group">
                <input id="task" type="text" value={this.state.task} onChange={this.handleChange} name="task" placeholder="Task Name"/>
              </div>

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