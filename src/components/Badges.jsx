import React, {Component} from 'react';


class Badges extends Component {

  constructor(props){
    super(props);
    this.renderImage = this.renderImage.bind(this);
    this.buildBunnyArray = this.buildBunnyArray.bind(this);
    this.goalsComplete = this.goalsComplete.bind(this);
    this.buildTextArray = this.buildTextArray.bind(this);
  }

  renderImage(i){
    let bunnyImages=this.buildBunnyArray()
      return(
        <img src={bunnyImages[i]}/>
      );
  }

  renderText(i){
    let textSlogans=this.buildTextArray()
      return(
        <p> {textSlogans[i]} </p>
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

  buildTextArray(){
    let textArray = ["Bet you thought you were rid of me!", "Is this Hockey? Cuz I'm a GOALie!", "I love! Selling! GOAAAALS!", "Hello bunny 4", "bunny 5", "bunny 6", "bunny 7", "nunny8"]
    let numberComplete = this.goalsComplete();
    if (numberComplete < 9) {
      let slicedTextArray = textArray.slice(0, numberComplete);
      // consolelog("SLICED ARRRAAAY", slicedTextArray)
      return slicedTextArray;
    } else {
      return textArray;
    };
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
              <td><div className="full-circle badge1">{this.renderImage(0)}</div>{this.renderText(0)}</td>
              <td><div className="full-circle badge2">{this.renderImage(1)}</div>{this.renderText(1)}</td>
              <td><div className="full-circle badge3">{this.renderImage(2)}</div>{this.renderText(2)}</td>
            </tr>
            <tr>
              <td><div className="full-circle badge4">{this.renderImage(3)}</div>{this.renderText(3)}</td>
              <td><div className="full-circle badge5">{this.renderImage(4)}</div>{this.renderText(4)}</td>
              <td><div className="full-circle badge6">{this.renderImage(5)}</div>{this.renderText(5)}</td>
            </tr>
            <tr>
              <td><div className="full-circle badge7">{this.renderImage(6)}</div>{this.renderText(6)}</td>
              <td><div className="full-circle badge8">{this.renderImage(7)}</div>{this.renderText(7)}</td>
              <td><div className="full-circle badge9">{this.renderImage(8)}</div>{this.renderText(8)}</td>
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
