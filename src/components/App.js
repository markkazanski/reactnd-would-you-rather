import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import LoginForm from './LoginForm';
import NewQuestions from './NewQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import QuestionPage from './QuestionPage';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;

    return (
      <div className="App">
        <div>Nav</div>
        <div>Logged in User: {authedUser}</div>
        {
          authedUser === null
            ? <LoginForm />
            : <QuestionPage id={'6ni6ok3ym7mf1p33lnez'} />
        }
        
      </div>
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
