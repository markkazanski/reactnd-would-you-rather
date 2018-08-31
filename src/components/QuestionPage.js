import React from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';


class QuestionPage extends React.Component{
    render(){
        const { id, questions, authedUser, users, dispatch } = this.props;
        const answered = questions[id].optionOne.votes.includes(authedUser) ||
            questions[id].optionTwo.votes.includes(authedUser);

        return(
            <div>
                {
                    answered
                    ? <AnsweredQuestion question={questions[id]} />
                    : <NewQuestion 
                        question={questions[id]} 
                        user={users[questions[id].author]}
                        authedUser={authedUser}
                        dispatch={dispatch}
                    />
                }
            </div>
        );
    }
}

class AnsweredQuestion extends React.Component{
    render(){
        const { question } = this.props;
        const votes1 = question.optionOne.votes.length;
        const votes2 = question.optionTwo.votes.length;
        const percent1 = (votes1 / (votes1 + votes2)) * 100;
        const percent2 = (votes2 / (votes1 + votes2)) * 100;
        return(
            <div>
                <h3>Poll Results</h3>
                 <div>
                    <h4>Option1: {question.optionOne.text}</h4>
                    <p>Votes: {votes1} out of {votes1 + votes2}</p>
                    <p>Percent: {percent1}</p>
                </div> 

                 <div>
                    <h4>Option2: {question.optionTwo.text}</h4>
                    <p>Votes: {votes2} out of {votes1 + votes2}</p>
                    <p>Percent: {percent2}</p>
                </div>

            </div>
        );
    }
}

class NewQuestion extends React.Component{
    handleAnswer(e, qid, authedUser){
        const answer = e.target.value;

        const { dispatch } = this.props;

        dispatch(handleAddAnswer(answer, qid));
    }
    render(){
        const { question, user, authedUser } = this.props;
        return(
            <div>
                <h2>Would You Rather?</h2>
                <button value='optionOne' onClick={(e) => this.handleAnswer(e, question.id, authedUser)}>{question.optionOne.text}</button> 
                 OR  
                <button value='optionTwo' onClick={(e) => this.handleAnswer(e, question.id, authedUser)}>{question.optionTwo.text}</button>
                <div>
                    By: {question.author}
                    <img src={user.avatarURL} />
                </div>
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

export default connect(mapStateToProps)(QuestionPage);