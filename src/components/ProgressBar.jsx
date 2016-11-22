import React, {Component} from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    <div className="progress-bar progress-bar-info"
    role="progressbar"
    aria-valuenow="60"
    aria-valuemin="0"
    aria-valuemax="100"
    style={{width: "20%"}}>
    </div>
  }
}

export default ProgressBar;