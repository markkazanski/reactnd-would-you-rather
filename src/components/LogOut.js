import React from 'react';
import { logOut } from '../actions/shared';
import { connect } from 'react-redux';

class LogOut extends React.Component{
    componentDidMount(){
        this.props.dispatch(logOut());
    }
    render(){
        return(
            <h1>You Logged Out</h1>
        );
    }
}

export default connect()(LogOut);