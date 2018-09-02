import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';


const AnsweredQuestions = props => {
    const { questions, authedUser } = props;
    return (
        <div>
            <h2>Answered Questions</h2>
            {
                Object.keys(questions).filter(qId => 
                    questions[qId].optionOne.votes.includes(authedUser) ||
                    questions[qId].optionTwo.votes.includes(authedUser)
                )
                .sort((a,b) => 
                    questions[b].timestamp - questions[a].timestamp
                )
                .map(qId => <Question question={questions[qId]} key={questions[qId].id}  />)
            }
        </div>
    );
}

function mapStateToProps({ users, questions, authedUser }){
    return {
      users, 
      questions,
      authedUser
    }
  }

export default connect(mapStateToProps)(AnsweredQuestions);