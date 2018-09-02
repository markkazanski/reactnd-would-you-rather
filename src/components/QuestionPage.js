import React from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';
import './QuestionPage.css';


const QuestionPage = props => {
    console.log("QuestionPage props", props)
    const { id, questions, authedUser, users, dispatch } = props;
    console.log('another id', id);
    let answered = false;
    if(questions[id]){
        answered = questions[id].optionOne.votes.includes(authedUser) ||
            questions[id].optionTwo.votes.includes(authedUser);
    } else {
        props.history.push('/404');
    }
    if(questions[id]){
        return(
            <div>
                {
                    answered
                    ? <AnsweredQuestion question={questions[id]} authedUser={authedUser} />
                    : <NewQuestion 
                        question={questions[id]} 
                        user={users[questions[id].author]}
                        authedUser={authedUser}
                        dispatch={dispatch}
                    />
                }
            </div>
        );
    } else {
        return <div></div>
    }
}

const AnsweredQuestion = props => {
        const { question, authedUser } = props;
        const votes1 = question.optionOne.votes.length;
        const votes2 = question.optionTwo.votes.length;
        const percent1 = (votes1 / (votes1 + votes2)) * 100;
        const percent2 = (votes2 / (votes1 + votes2)) * 100;

        const userAnswerOne = question.optionOne.votes.includes(authedUser)
            ? true
            : false;

        return(
            <div className='question old'>
                <h3>Poll Results</h3>
                 <div>
                    <h4>Option1: {question.optionOne.text}</h4>
                    <p>Votes: {votes1} out of {votes1 + votes2}</p>
                    <p>Percent: {percent1}</p>
                    {
                        userAnswerOne ? <p><strong>✔ Your Answer</strong></p> : null
                    }
                </div> 

                 <div>
                    <h4>Option2: {question.optionTwo.text}</h4>
                    <p>Votes: {votes2} out of {votes1 + votes2}</p>
                    <p>Percent: {percent2}</p>
                    {
                        !userAnswerOne ? <p><strong>✔ Your Answer</strong></p> : null
                    }
                </div>

            </div>
        );
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
            <div className='question new'>
                <h2>Would You Rather?</h2>
                <button value='optionOne' onClick={(e) => this.handleAnswer(e, question.id, authedUser)}>{question.optionOne.text}</button> 
                 OR  
                <button value='optionTwo' onClick={(e) => this.handleAnswer(e, question.id, authedUser)}>{question.optionTwo.text}</button>
                <div>
                    <p>By: {question.author}</p>
                    <p><img className='avatar' alt={question.author + ' avatar'} src={'/' + user.avatarURL} /></p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }, props){
    const { qid } = props.match.params;
    
    return {
        users,
        questions,
        authedUser,
        id: qid
    }
  }

export default connect(mapStateToProps)(QuestionPage);