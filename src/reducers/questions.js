import { RECEIVE_QUESTIONS, ADD_ANSWER } from '../actions/questions';

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
        default: 
            return state;
    }
}