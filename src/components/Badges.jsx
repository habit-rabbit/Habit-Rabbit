import React, {Component} from 'react';

class Badges extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    $.ajax({
      method: "get",
      url: "/api/badges",
      dataType: 'json'
    }).done((data) => {
      console.log("Badge data:", data);
    });
  }


  render() {

    return (
      <div className="container main-content">
        <h1>Badges</h1>
      </div>
    );
  }

}
export default Badges;
