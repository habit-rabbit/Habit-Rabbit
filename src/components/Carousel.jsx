import React, {Component} from 'react';
import Goals from './Goals.jsx';
class Carousel extends Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log("Rendering Carousel")

                  // goalInfo={this.props.goalInfo.data}
                  // taskInfo={this.props.taskInfo.data}
    return (
      <div id="carousel-example-generic" className="carousel slide">
        <ol className="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>

        <div className="carousel-inner">
          <div className="item active">
            <div className="container main-content">
              <h1 className="container-title"> ~ Your Current Goals ~ </h1>
                <Goals
                />
            </div>
            <div className="carousel-caption">
              <h1></h1>
              <p></p>
            </div>
         </div>

          <div className="item">
            <div className="container main-content">
            </div>
            <div className="carousel-caption">
              <h1>Slide 2</h1>
              <p>Slide 2 Description</p>
            </div>
          </div>

          <div className="item">
            <div className="container main-content">
            </div>
            <div className="carousel-caption">
              <h1>Slide 3</h1>
              <p>Slide 3 Description</p>
            </div>
          </div>

        </div>
      <a className="left carousel-control " href="#carousel-example-generic" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left white" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right white" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
      </div>
    );
  }

}
export default Carousel;
