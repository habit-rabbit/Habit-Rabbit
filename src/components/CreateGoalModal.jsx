import React, {Component} from 'react';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

import Nav from './Nav.jsx';


class CreateGoalModal extends Component {
  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      goalName: this.props.goalName,
      private: true,
      tasks: [""],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForms = this.renderForms.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;
    console.log("THIS STAAATE", this.state)
    this.setState({goalName: value});
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
            taskNames: this.state.tasks
          }
        }
      }).done ((data) => {
        $("#create-goal-modal").modal("hide");
        console.log("HI BITCH HEY", data);
      })
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

            // {this.renderError()}
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
            <form className="form-horizontal" onSubmit={this.handleSubmit}>

              <div className="form-group">
                <input id="goal-name" type="text" value={this.props.goalName} onChange={this.handleChange} name="goalName" placeholder="Goal Name"/>
              </div>


              <div className="form-group">
              {this.renderForms()}
              </div>
              <div className="form-group">
                <input type="submit" name="create-goal" className="btn btn-default" value="Create Goal!" />
              </div>
                <input type="button" name="add-task" onClick={this.handleAddTask} className="btn btn-default" value="ANOTHER!" />
            </form>
            </div>

          </div>
        </div>
      </div>
    );

    // return (

    //   <div className="goals-form-control" id="task-form-control">
    //   <form className="task-form" onSubmit={this.handleSubmit} >
    //     <div className="form-group row">
    //       <div className="col-xs-10">
    //         <input className="form-control" type="text" placeholder="I'm a cool task!" id="create-goal-input" value={this.state.value} onChange={this.handleChange}/>
    //       </div>
    //     </div>

    //     <div className="form-group row">
    //       <div className="col-xs-10">
    //         <input className="form-control" type="text" placeholder="Uhhh... I'M a task." id="create-goal-input" value={this.state.value} onChange={this.handleChange} />
    //       </div>
    //     </div>
    //     <div className="form-group row">
    //       <div className="col-xs-10">
    //         <input className="form-control" type="text" placeholder="No, I'M a task!" id="create-goal-input" value={this.state.value} onChange={this.handleChange} />
    //       </div>
    //     </div>
    //     <div className="form-group row">
    //       <div className="col-xs-10">
    //         <input className="form-control" type="text" placeholder="ugh, you're all wrong, I'M a task!" id="create-goal-input" value={this.state.value} onChange={this.handleChange} />
    //       </div>
    //     </div>
    //     <div className="form-group row">
    //       <div className="col-xs-10">
    //         <input className="form-control" type="text" placeholder="OMG. YOU'RE ALL TASKS." id="create-goal-input" value={this.state.value} onChange={this.handleChange} />
    //       </div>
    //     </div>

    //     <div className="col-md-8 col-md-offset-4">
    //       <input type="submit" className="btn btn-default" value="Create a New Goal!" />
    //     </div>

    //     <div className="img-container">
    //       <div className="row">
    //       <div className="col-md-8 col-centered">
    //       <img src="http://i.imgur.com/dmYCfcX.png" />
    //         <h5><p>Well well well. Look who we have here, it is our dear friend, string.interpolation. The bravery and courage you have shown by setting a new Goal has given Rabeet a little *bounce* in her step! When she is pleased, her coat is bright. Do not slack on your Goals though, or Rabeet will start turning back into a lazy rabid trash monster.</p></h5>
    //         <h6><p><em>I bet you were being a lazy little trash monster last night, wernt you!!</em></p></h6>
    //       </div>
    //       </div>
    //     </div>
    //   </form>
    //   </div>
    //   );
    // }
  }
}

export default CreateGoalModal