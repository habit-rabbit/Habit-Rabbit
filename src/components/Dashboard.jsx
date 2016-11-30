import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.renderGoals = this.renderGoals.bind(this);
    this.renderTutorial = this.renderTutorial.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.highlightItem = this.highlightItem.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      renderState: 'intro',
      tutorialSlides: ['intro', 'start', 'dailyGoals', 'goals', 'badges'],
      showTutorial: true
    }
  }

  componentWillMount() {
    document.addEventListener('keyup', this.handleEnter, false);
    //check to see if you have any goals.. if you dont its probably apparent
    //youve never been to this website before
    if (!this.props.goalList.length ) { // undefined...
      this.setState({showTutorial: true});
    }
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

  highlightItem(target) {
    setTimeout( () => {
      document.querySelector(target).classList.add('highlight');
    }, 6000);
    setTimeout( () => {
      document.querySelector(target).classList.remove('highlight');
    }, 12000);

  }
  renderGoals() {
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
  renderTutorial(key) {
    let render = null;
    switch(key) {
      case 'intro':
        render = <div className="row fade-in" key={key}>
                    <div className="col-md-12" className="text-center">
                      <p><strong>A Habit Rabbit's work is never</strong>done!</p>
                      <br/>
                      <p className="tutorial-toggle" data-id='1' onClick={this.handleClick} >Click here to Start or press Enter</p>
                    </div>
                </div>
        break;
      case 'start':
        render = <div className="row fade-in highlight" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong> What a Habit Rabbit is? </strong></h2>
                      <p> Habit Rabbit is all you need in life to keep you motivated & activated! </p>
                      <p> Keep yourself in <i>check</i> with your Daily Due's list!</p>
                      <p> Add Goals to your Long-term Goals page! </p>
                      <p> Work towards achieving them by completing your Tasks! </p>
                      <p> Do well and you might get a treat... </p>
                      <p className="tutorial-toggle" data-id='2' onClick={this.handleClick} >Press Enter or click here to continue... </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="Rabeet-wants-you-to-succeed!" />
                        <p><h6 className="text-center"> What am I? </h6></p>
                    </div>
                </div>
        break;
      case 'dailyGoals':
        render = <div className="row fade-in" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong>Daily Tasks</strong></h2>
                      <br/>
                        <p> To-Do lists got ya down? The Habit Rabbits feels you. That's why the Rabbits keep track of all those bits and pieces for you! </p>
                        <br/><p> On the Daily Task page you can jot down all those reminders and tasks by pressing the "Create A New Daily Reminder" button. Maybe it's HD ('heavy duty', Rabbits <i>love</i> acronyms.), like doing that important thing with the stuff, or selling that old jalopy wagon. Maybe it's simple, like "hey, don't be a turkey, floss your teeth!", Rabbits have got your back!</p>
                        <br/><p><h6> Navigate to Daily Tasks by either selecting it from the dropdown menu in the top right,<b> Or! </b> by pressing Alt and 'd' together on your keyboard! </h6></p>
                      <p className="tutorial-toggle" data-id='3' onClick={this.handleClick} >Press Enter or click here to continue... </p>
                    <div>
                        <img src="/rabeetdv.png" alt="Rabeet-wants-you-to-succeed!"/>
                        <p><h6 className="text-center"> What a Daily Task is? </h6></p>
                    </div>
                </div>
        break;
      case 'goals':
        render = <div className="row fade-in" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong>Goals</strong></h2>
                      <p> Start setting some Goals! To add your Goal, press "Create A New Goal" on the Long-term Goals page. From there enter your Goal.</p>
                      <p><h5>Examples: "learn to play a ..., Try and cook a ..., Climb Mt. Bunnimonjaro, Quit biting claws, Read all the Harry Potter books... So many options! The world is your Toaster! I mean Oyster! </h5></p>
                      <p> You can have a multitude of Tasks for each Goal. Tasks are defined by you, because you're awesome! Set as many as you want, but remember, the end goal is the...end...Goal... Heh. Think of Tasks as stepping-stones to reach your Goal. Break it down into chunks. For example, if you wanted to learn to play the Guitar, Task 1 might be "Get a Guitar in my paws. I mean hands."! Goals are the best. Don't be shy to set many! You can do it, the Rabbits believe in you! </p>
                      <br/><p><h6> Navigate to Goals by either selecting it in the dropdown menu in the top right,
                      <b> Or! </b> by pressing Alt and 'g' together on your keyboard! </h6></p>
                      <p className="tutorial-toggle" data-id='4' onClick={this.handleClick} >Press Enter or click here to continue... </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="Rabeet-wants-you-to-succeed!"/>
                        <p><h6 className="text-center"> What a Goalz is? </h6></p>
                    </div>
                </div>
        break;
      case 'badges':
        render = <div className="row fade-in" key={key}>
                    <div className="col-sm-6 col-sm-offset-3">
                      <h2><strong>Badges</strong></h2>
                        <p>You are rewared for acheiving your Goals! Isn't that incredible? aren't YOU incredible? The Habit Rabbits think so. But you best EARN them, cheating will get you no where in life... Probably. </p>

                        <br/><p><h6>Navigate to Badges by selecting it in the dropdown on the nav menu
                        <b> Or! </b> by pressing Alt and 'g' together on your keyboard! </h6></p>
                      <p className="tutorial-toggle" data-id='end' onClick={this.handleClick} >Press Enter or click here to end. </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="Rabeet-wants-you-to-succeed!"/>
                        <p><h6 className="text-center"> Do I get a Badge? </h6></p>
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
          <h2>Your Goals: </h2>
           {this.props.goalList.length ? this.renderGoals() : <p>You don't have any goals yet! </p>}
         </div>
        <div className="col-md-6">
          <h2>Your Todos: </h2>
        </div>
      </div>
    return(
      <div className="background-layout">
        <div className="container main-content">
          <div className="page-header text-center row">
            <h1>Welcome {this.props.goalList.length ? 'Back' : ''} {this.props.name}!</h1>
          </div>
               <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={1500}
                transitionLeaveTimeout={500}
                transitionLeave={false}>
            {this.state.showTutorial ? this.renderTutorial(this.state.renderState) : dashboard }
              </ReactCSSTransitionGroup>
        </div>
      {this.state.showTutorial ? <footer className="footer"/>: <footer id='restart-tutorial' className="footer">
        <div className="container">
          <p className="tutorial-toggle" data-id='restart' onClick={this.handleClick}> Again?!?! </p>
        </div>
      </footer>}
      </div>
     );
  }
}

export default Dashboard;