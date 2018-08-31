import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'

class LoginForm extends React.Component{
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        authedUser: ''
    }

    handleChange(e){
        const userId = e.target.value;
        
        this.setState(() => ({
            authedUser: userId
        }));
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.authedUser)

        const { authedUser } = this.state;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(authedUser));

        /*
        this.setState(() => ({
            text: '', 
            toHome: id ? false : true 
        })); //pass set state a fuction?
        */
    }

    render(){
        const { users, loading } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <select onChange={this.handleChange}>
                    <option>Choose your user</option>
                    {Object.keys(users).map(user => 
                        <option value={users[user].id} key={users[user].id}>{users[user].name}</option>
                    )}
                </select>
                <button type='submit'>Log In</button>
            </form>
        );
    }
}

function mapStateToProps({ users }){
    return {
      users,
      loading: users === null
    }
  }

export default connect(mapStateToProps)(LoginForm);