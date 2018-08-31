import React from 'react';

class Question extends React.Component{
    render(){
        console.log("queston", this.props.question);
        const { question } = this.props;

        return(
            <div>
                <h3>{question.optionOne.text} <em>or</em> {question.optionTwo.text}</h3>
                <small>{new Date(question.timestamp).toDateString()}</small>
                <hr />
            </div>
        );
    }

}

export default Question;