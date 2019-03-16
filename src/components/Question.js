import React from 'react';
import { Link } from 'react-router-dom';

const Question = props => {
        console.log("queston", props.question);
        const { question } = props;

        return(
            <Link className='question-link' to={`/questions/${question.id}`}>
                <h3>{question.optionOne.text} <em>or</em> {question.optionTwo.text}</h3>
                <small>{new Date(question.timestamp).toDateString()}</small>
                <hr />
            </Link>
        );
}

export default Question;