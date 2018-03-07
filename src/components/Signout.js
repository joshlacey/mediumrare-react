import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../actions/user.js';

const Signout = (props) => {

  props.logoutUser()

  return <Redirect to='/' />

}

function mapDispatchToProps(dispatch){
  return{
    logoutUser: () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(null, mapDispatchToProps)(Signout)
