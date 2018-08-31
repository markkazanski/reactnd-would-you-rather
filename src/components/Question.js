import React from 'react';
import { Link } from 'react-router-dom';

class Question extends React.Component{
    render(){
        console.log("queston", this.props.question);
        const { question } = this.props;

        return(
            <Link to={`/questions/${question.id}`}>
                <h3>{question.optionOne.text} <em>or</em> {question.optionTwo.text}</h3>
                <small>{new Date(question.timestamp).toDateString()}</small>
                <hr />
            </Link>
        );
    }

}

export default Question;