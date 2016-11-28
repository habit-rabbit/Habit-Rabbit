import React, {Component} from 'react';


class Badges extends Component {

  constructor(props){
    super(props);
    this.renderImage = this.renderImage.bind(this);
    this.buildBunnyArray = this.buildBunnyArray.bind(this);
    this.goalsComplete = this.goalsComplete.bind(this);
  }

  renderImage(i){
    let bunnyImages=this.buildBunnyArray()
      return(
        <img src={bunnyImages[i]}/>
      );
    }

  buildBunnyArray(){
    let bunnyArray =["/rabeetzombie.png","/rabeetpurple.png","/rabeetbluezebra.png","/rabeetorangetub.png","/rabeetnerd.png","/rabeetgreen.png","/rabeetpig.png","/rabeetpinky.png","/rabeetdon.png"];
    let numberComplete = this.goalsComplete();
    if (numberComplete < 9) {
      let slicedBunnyArray = bunnyArray.slice(0, numberComplete);
      return slicedBunnyArray;
    } else {
      return bunnyArray;
    };
  }

  goalsComplete(){
    let numberComplete = 0;
    for (let goal of this.props.goalList) {
      if (goal.is_done === true) {
        numberComplete += 1;
      };
    };
    return numberComplete
  }


  render() {

    return (
      <div className="background-layout">
      <div className="container main-content">
      <div className="page-header">
        <h1 className="container-title">Badges</h1>
      </div>
      <div>
        <table className="table no-border">
          <tbody>
            <tr>
              <td><div className="full-circle badge1">{this.renderImage(0)}</div></td>
              <td><div className="full-circle badge2">{this.renderImage(1)}</div></td>
              <td><div className="full-circle badge3">{this.renderImage(2)}</div></td>
            </tr>
            <tr>
              <td><div className="full-circle badge4">{this.renderImage(3)}</div></td>
              <td><div className="full-circle badge5">{this.renderImage(4)}</div></td>
              <td><div className="full-circle badge6">{this.renderImage(5)}</div></td>
            </tr>
            <tr>
              <td><div className="full-circle badge7">{this.renderImage(6)}</div></td>
              <td><div className="full-circle badge8">{this.renderImage(7)}</div></td>
              <td><div className="full-circle badge9">{this.renderImage(8)}</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      </div>
    );
  }

}
export default Badges;
