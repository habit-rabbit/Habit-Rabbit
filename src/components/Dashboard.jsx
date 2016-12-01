import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Dashboard extends Component {
  //the dashboard as of now serves as a tutorial page,
  //it however has left room to be converted to a user 'dashboard' with some
  //minor changes. With time constraints, the decision was made to not use this
  // user dashboard feature as it would not be polished to our standards by time of release
  constructor(props) {
    super(props);
    // this.renderGoals = this.renderGoals.bind(this);
    this.renderTutorial = this.renderTutorial.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      renderState: 'intro',
      tutorialSlides: ['intro', 'start', 'dailyGoals', 'goals', 'badges'],
      showTutorial: true
    }
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleEnter, false);
    // **this conditional is in regards to a future feature of the tutorial view being converted to a user dashboard
    // ** not in implemenation currently
    // if (!this.props.goalList.length ) { // undefined...
    //   this.setState({showTutorial: true});
    // }
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleEnter, false);
  }

  handleEnter(event) {
    //check if enter key was pressed
    if(event.key === 'Enter') {
      //check which event we are on
      let currentState = this.state.renderState;
      //if you are on badges, then trigger end of tutorial
      if (currentState !== 'badges'){
        //find that in array..
        let index = this.state.tutorialSlides.findIndex( (elm) => {
          return elm === currentState;
        });
        //set new state with the next element after the found index;
        let slide = this.state.tutorialSlides[index + 1];
        this.setState({renderState: slide});
      } else if (currentState === "badges") {
          this.props.setView(2);
      } else {
        this.setState({showTutorial: false});
        document.removeEventListener('keyup', this.handleEnter, false)
      }
    }
  }

  handleClick(event) {
    let id = event.target.dataset.id;
    if(id === 'restart') {
      this.setState({showTutorial: true, renderState: 'start'});
      document.addEventListener('keyup', this.handleEnter, false);
    } else if (id==='end') {
      document.removeEventListener('keyup', this.handleEnter, false);
      this.setState({showTutorial: true});
      this.props.setView(2);
    } else {
      let slide = this.state.tutorialSlides[id];
      this.setState({renderState: slide});
    }
  }
  //at this time we are not implementing the rendering of goals as this is intended for the user dashboard feature which is
  // not in production at this time
  /*renderGoals() {
    //only display top 5 goals and top 3 tasks for goal so we dont over populate dashboard
        return (
          <div>
            {this.props.goalList.map( (goal, goalIndex) => {
              if(!goal.is_done && goalIndex < 5) {
                return (
                  <div key={goalIndex}>
                    <h4>{goal.name}...</h4>
                    <ol>
                      {goal.tasks.map((task, index) => {
                        let taskClass = "";
                        if(index < 3) {
                          return(
                            <li key={(index)}className={taskClass}>{task.name}</li>
                            )
                        }
                      })}
                  ...
                    </ol>
                  </div>
                  );
              }
            })}
          </div>
          );
  }
*/
//this function conditionally renders a "slide" dependant on a key that is passed in. This function is triggered by a state change
  renderTutorial(key) {
    let render = null;
    switch(key) {
      case 'intro':
        render = <div className="row fade-in" key={key}>
                    <div className="col-md-12" className="text-center">
                      <p><strong>A Habit Rabbit's work is never</strong> done!</p>
                      <br/>
                      <p className="tutorial-toggle" data-id='1' onClick={this.handleClick}> Click here to Start the Tutorial! </p>
                    </div>
                </div>
        break;
      case 'start':
        render = <div className="row fade-in highlight" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong> What is a Habit Rabbit? </strong></h2>
                      <br/>
                      <p> Habit Rabbit is all you need in life to keep you motivated & activated! </p>
                      <p> Keep yourself in <i>check</i> with your Daily Due's list! </p>
                      <p> Add Goals to your Long-term Goals page! </p>
                      <p> Work towards achieving them by completing your Tasks! </p>
                      <p> Do well and you might get a treat... </p>
                      <p className="tutorial-toggle" data-id='2' onClick={this.handleClick}> Click here to continue or press Enter </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" id="tutorial-bunny" alt="Rabeet-wants-you-to-succeed!"/>
                        <h6 className="text-center"> What am I? </h6>
                    </div>
                </div>
        break;
      case 'dailyGoals':
        render = <div className="row fade-in" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong>Daily Tasks</strong></h2>
                      <br/>
                      <p> To-Do lists got ya down? The Habit Rabbits feel you. That's why the Rabbits keep track of all those bits and pieces for you! </p>
                      <br/>
                      <p> On the "Daily Task" page you can jot down all those reminders and tasks by pressing the "Create A New Daily Reminder" button. Maybe it's HD ("heavy duty" - Rabbits <i>love</i> acronyms.), like doing that important thing with the stuff, or selling that jalopy old wagon. Maybe it's simple, like "Hey, don't be a turkey, floss your teeth!". In any case, the Habit Rabbits have got your back!</p>
                      <br/>
                      <h6> Navigate to "Daily Tasks" by selecting it from the dropdown menu (click your name) in the top right. </h6>
                      <p className="tutorial-toggle" data-id='3' onClick={this.handleClick}> Click here to continue or press Enter </p>
                    </div>
                    <div>
                      <img src="/rabeetdv.png" id="tutorial-bunny-daily" alt="Rabeet-wants-you-to-succeed!"/>
                      <h6 className="text-center"> What a Daily Task is? </h6>
                    </div>
                </div>
        break;
      case 'goals':
        render = <div className="row fade-in" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong>Goals</strong></h2>
                      <br/>
                      <p> Start setting some Goals! To add your Goal, press "Create A New Goal" on the "Long-term Goals" page. From there you can review your current Goals and add new ones. </p>
                      <h5> Examples: "Learn to play a ..., Try and cook a ..., Climb Mt. Bunnimonjaro, Quit biting claws, Read all the Harry Potter books... So many options! The world is your toaster! I mean oyster! </h5>
                      <p> You can have a multitude of Tasks for each Goal. Tasks are defined by you, because you're awesome! Set as many as you want, but remember, the end goal is the...end...Goal... Heh. Think of Tasks as stepping-stones to reach your Goal. Break it down into chunks. For example, if you wanted to learn to play the guitar, Task 1 might be "Get a guitar in my paws... I mean hands!" Goals are the best. Don't be shy to set many! You can do it, the Rabbits believe in you! </p>
                      <br/>
                      <h6> Navigate to "Long-term Goals" by selecting it from the dropdown menu (click your name) in the top right. </h6>
                      <p className="tutorial-toggle" data-id='4' onClick={this.handleClick}> Click here to continue or press Enter </p>
                    </div>
                    <div>
                      <img src="/rabeetdv.png" id="tutorial-bunny-goal" alt="Rabeet-wants-you-to-succeed!"/>
                      <h6 className="text-center"> What a Goalz is? </h6>
                    </div>
                </div>
        break;
      case 'badges':
        render = <div className="row fade-in" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong> Badges </strong></h2>
                      <br/>
                      <p>You are rewarded for achieving your Goals! And not just by that fabulous brain rush of serotonin! Isn't that incredible? Aren't YOU incredible? The Habit Rabbits think so. But you best EARN those rewards! Cheating will get you nowhere in life... Probably. </p>
                      <br/>
                      <h6> Navigate to "Badges" by selecting it from the dropdown menu in the top right. </h6>
                      <p className="tutorial-toggle" data-id='end' onClick={this.handleClick}> Press Enter or click here to end. </p>
                    </div>
                    <div>
                      <img src="/rabeetdv.png" id="tutorial-bunny-badge" alt="Rabeet-wants-you-to-succeed!"/>
                      <h6 className="text-center"> Do I get a Badge? </h6>
                    </div>
                </div>
        break;
    }
    return render;
  }

  render() {
    let dashboard =
      <div className="row">
        <div className="col-md-6">
          <h2> Your Goals: </h2>
         </div>
        <div className="col-md-6">
          <h2> Your Todos: </h2>
        </div>
      </div>
    return(
      <div className="background-layout">
        <div className="container main-content">
               <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={1500}
                transitionLeaveTimeout={500}
                transitionLeave={false}>
            {this.state.showTutorial ? this.renderTutorial(this.state.renderState) : dashboard }
              </ReactCSSTransitionGroup>
        </div>
      {this.state.showTutorial ? <footer className="footer"/>: <footer id="restart-tutorial" className="footer">
        <div className="container">
          <p className="tutorial-toggle" data-id="restart" onClick={this.handleClick}> Again?!?! </p>
        </div>
      </footer>}
      </div>
    );
  }
}

export default Dashboard;