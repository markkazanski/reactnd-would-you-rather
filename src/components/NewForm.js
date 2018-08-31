import React from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';
import './NewForm.css';

class NewForm extends React.Component{
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();

        const { optionOne, optionTwo } = this.state;
        const { dispatch, authedUser } = this.props;

        //{ optionOneText, optionTwoText, author }
        dispatch(handleAddQuestion({ 
            optionOneText: optionOne, 
            optionTwoText: optionTwo, 
            author: authedUser 
        }));
        
        
        this.setState(() => ({
            optionOne: '', 
            optionTwo: '',
            toHome: true 
        })); //pass set state a fuction?
    }
    render(){
        const { optionOne, optionTwo, toHome } = this.state;

        if(toHome)
            return <Redirect to='/' />

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Enter Your Question</h3>
                <h4>Would You Rather: </h4>
                <div>
                    <textarea onChange={this.handleChange} value={optionOne} name='optionOne' placeholder='Option one'>

                    </textarea>
                    OR
                    <textarea onChange={this.handleChange} value={optionTwo} name='optionTwo' placeholder='Option two'>

                    </textarea>
                </div>
                <div>
                    <button 
                        type='submit'
                        disabled={optionOne.length === 0 || optionTwo.length === 0 ? true : false}
                    >Submit</button>
                </div>
            </form>
        );
    }
}

function mapStateToProps({ authedUser }){
    return {
      authedUser
    }
  }

export default connect(mapStateToProps)(NewForm);