import React, {Component} from 'react';


class CreateDailyGoalModal extends Component {

  constructor (props) {
    super (props);
    this.state = {
      dailyGoalName: "",
      dailyGoalNameErr: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitToDatabase = this.submitToDatabase.bind(this);
  }

  componentDidMount () {
    $('#create-daily-goal-modal').on('shown.bs.modal', function () {
      $('#daily-goal-name').focus();
    });
  }

  handleChange (event) {
    let value = event.target.value;
    this.setState({dailyGoalName: value});
  }

  handleSubmit (event) {
    event.preventDefault();
    let dailyGoalName = this.state.dailyGoalName.trim();
    this.validateFormInputs(dailyGoalName, this.submitToDatabase);
  }

  submitToDatabase (goal) {
    console.log("submitting to database");
    $.ajax({
      method: 'post',
      url: '/api/daily_goals/create',
      dataType: 'json',
      data: {
        data: {
          name: goal,
        }
      }
    }).done ((response) => {
      console.log("Got the response from CreateDailyGoalModal! Its:", response);
      this.setState({dailyGoalName: ""});
      this.props.updateDailies();
      $("#create-daily-goal-modal").modal("hide");
    });
  }

  validateFormInputs(goal, cb) {
    console.log("validating form inputs");
    if (goal === "") {
      this.setState({dailyGoalNameErr: "Well this is awkward. You have to WRITE SOMETHING."});
    } else {
      cb(goal);
    }
  }

  renderErrors () {
    console.log("render errors:", this.state.dailyGoalNameErr);
    if (this.state.dailyGoalNameErr !== "") {
      return (
        <div className="alert alert-warning">
          {this.state.dailyGoalNameErr}
        </div>
      );
    }
  }

  render () {
    return (
      <div className="modal fade" id="create-daily-goal-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h1 className="modal-title" id="myModalLabel">Create Your New Goal</h1>
            </div>

            <div id="create-daily-goal-body" className="modal-body">
            {this.renderErrors()}
            <form onSubmit={this.handleSubmit}>

              <div className="form-group form-group-modal">
                <input id="daily-goal-name" type="text" value={this.state.goalName} onChange={this.handleChange} name="goalName" placeholder="Goal Name" />
              </div>

              <div className="form-group form-group-modal">
                <input type="submit" name="create-goal" className="btn btn-default" value="Get Cracking!" />
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateDailyGoalModal;

