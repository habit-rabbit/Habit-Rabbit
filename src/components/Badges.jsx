import React, {Component} from 'react';


class Badges extends Component {

  constructor(props){
    super(props);
    this.renderImage = this.renderImage.bind(this);
    this.buildBunnyArray = this.buildBunnyArray.bind(this);
    // this.goalsComplete = this.goalsComplete.bind(this);
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
        <p>{textSlogans[i]}</p>
      );
  }

  buildBunnyArray(){
    console.log('====================Here are the number of badges:', this.props.badges, '====================')
    let bunnyArray =["/rabeetzombie.png","/rabeetpurple.png","/rabeetbluezebra.png","/rabeetorangetub.png","/rabeetnerd.png","/rabeetgreen.png","/rabeetpig.png","/rabeetpinky.png","/rabeetdon.png"];
    let numberComplete = this.props.badges;
    if (numberComplete < 9) {
      let slicedBunnyArray = bunnyArray.slice(0, numberComplete);
      return slicedBunnyArray;
    } else {
      return bunnyArray;
    };
  }

  // goalsComplete(){
  //   let numberComplete = 0;
  //   for (let goal of this.props.goalList) {
  //     if (goal.is_done === true) {
  //       numberComplete += 1;
  //     };
  //   };
  //   return numberComplete
  // }

  buildTextArray(){
    let textArray = ["You're not in Kansas anymore.", "You're gonna need a bigger b-- goal...", "I love the smell of napalm in the morning.", "Rosebud.", "Have you tried turning it off and on again?", "Soylent Green is people!", "Frankly, Susan, I don't give a damn.","Open the pod bay doors, HAL", "Proper Planning Prevents Poor Performance"]
    let numberComplete = this.props.badges;
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
          <div className='container'>
            <div className="row">
              <div className='col-md-4 badge-table'><div className="full-circle badge1">{this.renderImage(0)}</div><h4 className='badge-text'>{this.renderText(0)}</h4></div>
              <div className='col-md-4 badge-table'><div className="full-circle badge2">{this.renderImage(1)}</div><h4 className='badge-text'>{this.renderText(1)}</h4></div>
              <div className='col-md-4 badge-table'><div className="full-circle badge3">{this.renderImage(2)}</div><h4 className='badge-text'>{this.renderText(2)}</h4></div>
            </div>
            <div className='row'>
              <div className='col-md-4 badge-table'><div className="full-circle badge4">{this.renderImage(3)}</div><h4 className='badge-text'>{this.renderText(3)}</h4></div>
              <div className='col-md-4 badge-table'><div className="full-circle badge5">{this.renderImage(4)}</div><h4 className='badge-text'>{this.renderText(4)}</h4></div>
              <div className='col-md-4 badge-table'><div className="full-circle badge6">{this.renderImage(5)}</div><h4 className='badge-text'>{this.renderText(5)}</h4></div>
            </div>
            <div className='row'>
              <div className='col-md-4 badge-table'><div className="full-circle badge7">{this.renderImage(6)}</div><h4 className='badge-text'>{this.renderText(6)}</h4></div>
              <div className='col-md-4 badge-table'><div className="full-circle badge8">{this.renderImage(7)}</div><h4 className='badge-text'>{this.renderText(7)}</h4></div>
              <div className='col-md-4 badge-table'><div className="full-circle badge9">{this.renderImage(8)}</div><h4 className='badge-text'>{this.renderText(8)}</h4></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default Badges;
