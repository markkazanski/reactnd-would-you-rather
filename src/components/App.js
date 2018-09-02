import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoginForm from './LoginForm';
import NewQuestions from './NewQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import QuestionPage from './QuestionPage';
import NewForm from './NewForm';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import NotFound from './NotFound';
import LogOut from './LogOut';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <div className="App">
          <div><Nav /></div>
          {
            authedUser === null
              ? <LoginForm />
              : <div> 
                  <div className='logged-user'>Logged in User: {authedUser}</div>
                  <Switch>
                    <Route path='/' exact component={NewQuestions} />
                    <Route path='/answered' component={AnsweredQuestions} />
                    <Route path='/questions/:qid' component={QuestionPage} />
                    <Route path='/add' component={NewForm} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/logout' component={LogOut} />
                  
                    <Route exact component={NotFound} />
                  </Switch>
                </div>
          }
          
        </div>
      </Router>
    );
  }
}


function mapStateToProps({ authedUser }){
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
