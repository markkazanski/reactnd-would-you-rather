import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { receiveQuestions } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';

const AUTHED_ID = null;

export function handleInitialData(){
    return dispatch => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(AUTHED_ID));
            });
    }
}

export function updateLeaderBoard(){
    return dispatch => {
        return getInitialData()
            .then(({users}) => {
                dispatch(receiveUsers(users));
            });
    }
}

export function logOut(){
    return dispatch => {
        return getInitialData()
            .then(({users}) => {
                dispatch(setAuthedUser(null));
            });
    }
}