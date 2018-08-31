import { RECEIVE_QUESTIONS, ADD_ANSWER, ADD_QUESTION } from '../actions/questions';

export default function tweets(state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS: 
            return {
                ...state,
                ...action.questions
            };
        case ADD_ANSWER: 
            const { answer, qid, authedUser } = action;
            let questionObj = state[qid];
            questionObj[answer].votes = questionObj[answer].votes.concat([authedUser]);
            return {
                ...state,
                [qid]: questionObj
            };
        case ADD_QUESTION:
            console.log('ADD_QUESTION action',action);

            return {
                ...state,
                [action.question.id]: action.question
            };
        default: 
            return state;
    }
}