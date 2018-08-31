import React from 'react';
import { connect } from 'react-redux';


class NewQuestions extends React.Component{
    render(){
        const { questions, authedUser } = this.props;
        return (
            <div>
                <h2>New Questions</h2>
                {
                    Object.keys(questions).filter(qId => 
                        !questions[qId].optionOne.votes.includes(authedUser) &&
                        !questions[qId].optionTwo.votes.includes(authedUser)
                    )
                    .sort((a,b) => 
                        questions[b].timestamp - questions[a].timestamp
                    )
                    .map(qId => <p>{questions[qId].id + " " + questions[qId].author}</p>)
                }
            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }){
    return {
      users, 
      questions,
      authedUser
    }
  }

export default connect(mapStateToProps)(NewQuestions);