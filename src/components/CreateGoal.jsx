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
      url: '/goals/create',
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
          <label for="example-text-input" className="col-xs-2 col-form-label"></label>
          <div className="col-xs-10">
            <input className="form-control" type="text" value="I'm a Goal name! I'm the best!" id="example-text-input"/>
          </div>
        </div>

        <div className="form-group row">
          <label for="example-date-input" className="col-xs-2 col-form-label"></label>
          <div className="col-xs-10">
            <input className="form-control" type="date" value="2016-12-14" id="example-date-input"/>
          </div>
        </div>

        <div className="form-group row">
          <label for="example-url-input" className="col-xs-2 col-form-label"></label>
          <div className="col-xs-10">
            <input className="form-control" type="text" value="I'm a task!" id="example-url-input"/>
          </div>
        </div>
        <div className="form-group row">
          <label for="example-url-input" className="col-xs-2 col-form-label"></label>
          <div className="col-xs-10">
            <input className="form-control" type="text" value="No, I'M a task!" id="example-url-input"/>
          </div>
        </div>
        <div className="form-group row">
          <label for="example-url-input" className="col-xs-2 col-form-label"></label>
          <div className="col-xs-10">
            <input className="form-control" type="text" value="ugh, you're BOTH wrong, I'M a task!" id="example-url-input"/>
          </div>
        </div>
        <div className="form-group row">
          <label for="example-url-input" className="col-xs-2 col-form-label"></label>
          <div className="col-xs-10">
            <input className="form-control" type="text" value="OMG. YOU'RE ALL TASKS." id="example-url-input"/>
          </div>
        </div>

      </div>


      );
    }

}
export default CreateGoal;
