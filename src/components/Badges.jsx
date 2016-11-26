import React, {Component} from 'react';

class Badges extends Component {

  constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="container main-content">
      <div>
        <h1>Badges</h1>
      </div>
      <div>
        <table class="table">
          <p><h1>HELLO</h1></p>
            <tr class="active">HIHI</tr>
            <tr class="success">HOHO</tr>
            <tr class="warning">CUTE</tr>
            <tr class="danger">DOG FISH AND CAT FISH</tr>
            <tr class="info">ITS NOT EASY BEING CHEEESY</tr>
        </table>
      </div>
      </div>
    );
  }

}
export default Badges;
