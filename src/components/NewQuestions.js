import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

const NewQuestions = props => {
        const { questions, authedUser } = props;
        return (
            <div>
                <h2>New Questions</h2>
                {
                    Object.keys(questions).filter(qId => 
                        !(questions[qId].optionOne.votes.indexOf(authedUser) > -1) &&
                        !(questions[qId].optionTwo.votes.indexOf(authedUser) > -1)
                    )
                    .sort((a,b) => 
                        questions[b].timestamp - questions[a].timestamp
                    )
                    .map(qId => <Question key={qId} question={questions[qId]} />)
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

export default connect(mapStateToProps)(NewQuestions);