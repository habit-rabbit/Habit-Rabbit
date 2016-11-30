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
  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps.goalList.length !== this.props.goalList.length) {
  //     return true;
  //   }
  // }
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
                    <div className="col-md-12">
                      <p><b>Oh Wow! </b> Its your first time here! Well lucky for you we have
                      this <i>handy</i> dandy tutorial lined up for you! </p>
                      <br/>
                      <p className="goalInfo-toggle first" data-id='1' onClick={this.handleClick} >Click here to Start or press Enter</p>
                    </div>
                </div>
        break;
      case 'start':
        render = <div className="row fade-in highlight" key={key}>
                    <div className="col-md-8">
                      <h2><strong>Welcome to Habit Rabit!</strong></h2>
                      <div className="tutorial-text">
                        <p>   The solution to your goal-setting needs </p>
                        <p>  This app allows you to create and keep track of the goals,
                          habits (good and bad ones!), and todos that you have in your busy life
                          all in one place while making it fun to <i>tick</i> of anything on those lists!
                        </p>
                      </div>
                      <p className="goalInfo-toggle" data-id='2' onClick={this.handleClick} >Press Enter or click here to continue... </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="image-of-zombie-rabbit"/>
                    </div>
                </div>
        break;
      case 'dailyGoals':
        render = <div className="row fade-in" key={key}>
                    <div className="col-md-8">
                      <h2><strong>Daily Tasks</strong></h2>
                      <div className="tutorial-text">
                        <p>   You can set a plethora of daily tasks for you to keep track of..<br/>
                          Have a mental note? Why waste that brain space! Write it down!
                          You can navigate to the daily tasks page by either selecting the drop down menu on the navigation bar
                        <b> Or! </b> by pressing Alt and 'd' together on your keyboard!
                        <br/> On the Daily Task page, you can jot down all those tasks by selecting the create task button or by
                           or by pressing Alt and 'm' together on your keyboard.</p>
                      </div>
                      <p className="goalInfo-toggle" data-id='3' onClick={this.handleClick} >Press Enter or click here to continue... </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="image-of-zombie-rabbit"/>
                    </div>
                </div>
        break;
      case 'goals':
        render = <div className="row fade-in" key={key}>
                    <div className="col-md-8">
                      <h2><strong>Goals</strong></h2>
                      <div className="tutorial-text">
                        <p>This is where you get to kick the butt out of a goal you've always had!<br/>
                         Maybe you want to excercise a bit more? Learn a new instrument? Kick a bad habit?
                         You can do that here! Navigate to the goals page by either selecting it in the dropdown menu in the nav bar
                        <b> Or! </b> by pressing Alt and 'g' together on your keyboard!
                        <br/>On the Goals page, you can create a new goal by selecting the button (or by pressing Alt 'n') and add tasks
                          to keep track of your goal.<br/></p>
                        <h4>This is the fun part!</h4>
                        <p>You are rewared for completing goals (isn't that awesome?). For every goal you finish you get a nice badge to
                          show off in your badges page(explained next). Earn them, no one likes a cheater...</p>
                      </div>
                      <p className="goalInfo-toggle" data-id='4' onClick={this.handleClick} >Press Enter or click here to continue... </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="image-of-zombie-rabbit"/>
                    </div>
                </div>
        break;
      case 'badges':
        render = <div className="row fade-in" key={key}>
                    <div className="col-md-8">
                      <h2><strong>Badges</strong></h2>
                      <div className="tutorial-text">
                        <p>This is where you get to see what your good work has surmised too..<br/>
                          There are 9 custom decorated Bunny Badges to achieve!
                          You can get to your badges page by selecting it in the dropdown on the nav menu
                          <b> Or! </b> by pressing Alt and 'g' together on your keyboard!
                        </p>
                      </div>
                      <p className="goalInfo-toggle" data-id='end' onClick={this.handleClick} >Press Enter or click here to end </p>
                    </div>
                    <div>
                        <img src="/rabeetdv.png" alt="image-of-zombie-rabbit"/>
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
    console.log("rendered")
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
          <p className="goalInfo-toggle" data-id='restart' onClick={this.handleClick}> Want to see the tutorial again? Click here</p>
        </div>
      </footer>}
      </div>
     );

  }

}

export default Dashboard;