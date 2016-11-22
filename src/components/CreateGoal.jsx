import React, {Component} from 'react';
import Nav from './Nav.jsx';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';


class CreateGoal extends Component {
  constructor(props) {
    super(props);
    this.users = {};
    this.state = {
      name: "",
      private: true,
      user_id: "",
      challenge_id: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "name") {
      this.setState({name: value});
    }
    if (id === "private") {
      this.setState({private: value});
    }
    if (id === "user_id") {
      this.setState({user_id: value});
    }
    if (id === "challenge_id") {
      this.setState({challenge_id: value});
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
          name: this.state.name,
          private: this.state.private,
          user_id: this.state.user_id,
          challenge_id: this.state.challenge_id
        }
      }
    })
  }
  render() {
      console.log("Rendering <CreateGoal/>");

      return (

      <div className="goals-form-control">
        <div className="form-group row">
          <div className="col-xs-10">
            <input className="form-control" type="text" value="I'm a Goal name! I'm the best!" id="create-goal-input"/>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-xs-10">
            <input className="form-control" type="text" value="I'm a task!" id="create-goal-input"/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-10">
            <input className="form-control" type="text" value="No, I'M a task!" id="create-goal-input"/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-10">
            <input className="form-control" type="text" value="ugh, you're BOTH wrong, I'M a task!" id="create-goal-input"/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-10">
            <input className="form-control" type="text" value="OMG. YOU'RE ALL TASKS." id="create-goal-input"/>
          </div>
        </div>

          <div className="img-container">
            <div className="row">
            <div className="col-md-8 col-md-offset-3">
            <img src="http://i.imgur.com/dmYCfcX.png" />
              <h5><p>Well well well. Look who we have here, it is our dear friend, string.interpolation. The bravery and courage you have shown by setting a new Goal has given Rabeet a little *bounce* back! When she is pleased her goat is bright. Do not slack on your Goals though, or Rabeet will start turning back into a rabid lazy trash monster.</p></h5>
              <h6><p><em>I bet you were being a lazy little trash monster last night, wernt you!!</em></p></h6>
            </div>
            </div>
          </div>

      </div>


      );
    }

}
export default CreateGoal;
