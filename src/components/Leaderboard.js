import React from 'react';
import { connect } from 'react-redux';
import { updateLeaderBoard } from '../actions/shared';


class Leaderboard extends React.Component{
    componentDidMount(){
        this.props.dispatch(updateLeaderBoard());
    }

    render(){
        const { users, questions } = this.props;

        const userArray = ranking(users, questions);

        return (
            <div>
                <h2>Leader Board</h2>
                {userArray.map((user, i) => (
                    <div key={user.uid}>
                        <h4>{i+1}. {users[user.uid].name}</h4>
                        <p><img src={`/` + users[user.uid].avatarURL} /></p>
                        <p>
                            <span>Votes: {user.votes}</span>
                            <br />
                            <span>Questions: {user.qs}</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    }

}


function ranking(users, questions){

    const userArray = [];

    Object.keys(users).forEach(uid => {
        const votes = Object.keys(users[uid].answers).length;
        const qs = users[uid].questions.length;
        userArray.push({
            uid,
            votes,
            qs
        })
    });

    return userArray.sort((a,b) => {
        return (b.votes + b.qs) - (a.votes + a.qs)
    });

    /*
    const rankedArray = Object.keys(users)
    .sort((a,b) => {
        let votesB = 0; 
        let votesA = 0;
        Object.keys(questions).forEach(q => {
            if(questions[q].optionOne.votes.contains(b) || questions[q].optionTwo.votes.contains(b))
                votesB++;
            if(questions[q].optionOne.votes.contains(a) || questions[q].optionTwo.votes.contains(a))
                votesA++;
        });
        const rankB = users[b].questions.length + votesB;
        const rankA = users[a].questions.length + votesA;
        return rankB - rankA;
    });
    console.log(rankedArray);
    */
}


function mapStateToProps({ users, questions }){
    return {
        users, 
        questions
    }
}

export default connect(mapStateToProps)(Leaderboard);