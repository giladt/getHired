import React from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar/nav_bar_demo';
import Questions from './Components/Questions/questions';
import Question from './Components/Questions/Question/question';
import Callback from './Components/Auth/callback';
import {Route} from 'react-router-dom';
import Styles from './Styles/appDemo.module.css'

class AppDemo extends React.Component<any> {
  render() {
    return (
      <div className={Styles.body}>
        <NavBar/>
        <Route exact path='/questions/' component={Questions} />
        <Route exact path='/questions/:questionId' component= {Question} />
        <Route exact path='/questions/callback' component={Callback}/>
      </div>
    );
  }
}

export default withRouter(AppDemo);
