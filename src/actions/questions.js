import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER'; 

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question
    }
}

function addAnswer(answer){
    return {
        type: ADD_ANSWER,
        answer: answer.answer,
        qid: answer.qid,
        authedUser: answer.authedUser
    }
}

export function handleAddAnswer(answer, qid){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestionAnswer({
            answer,
            qid,
            authedUser
        })
        .then(answerResult => {
            console.log("answerResult", answerResult);
            dispatch(addAnswer({
                answer,
                qid,
                authedUser
            }));
        });
    }   
}

export function handleAddQuestion(text){
    return (dispatch, getState) => {
        const { authedUser } = getState();

        return saveQuestion({
            text,
            author: authedUser,
        })
        .then(question => {
            dispatch(addQuestion(question));
        });
    }
}