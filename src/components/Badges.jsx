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
      <div>
        <h1>Badges</h1>
      </div>
      <div>
        <h1>HELLO</h1>
        <table className="table">
          <tbody>
            <tr>
              <td><img src="/bunnysmirk.png" className="img-rounded"/><span>First Goal Complete!</span></td>
              <td><img src="/bunnysmirk.png" className="img-rounded"/></td>
            </tr>
              <tr><td>test</td><td>test2</td></tr>
              <tr><td>test</td><td>test2</td></tr>
              <tr><td>test</td><td>test2</td></tr>
              <tr><td>test</td><td>test2</td></tr>

          </tbody>
        </table>
      </div>
      </div>
    );
  }

}
export default Badges;
