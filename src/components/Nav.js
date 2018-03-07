import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchStories from './navigation/SearchStories'
import { showSigninPopup, showSignupPopup } from '../actions/main.js'
import { showUserOptionsPopup } from '../actions/user.js'

const Nav = (props) => {

  const username = localStorage.getItem('username')
  const hasToken = !!localStorage.getItem('jwtToken')

  const loggedInView = () => (<div><Link to='/alerts'>bell</Link><img width='40px' onClick={props.showUserOptionsPopup} alt='Profile' src='https://cdn2.iconfinder.com/data/icons/mini-icon-4/48/my-profile-512.png'></img></div>)
  const loggedOutView = () => (<div><div onClick={props.showSigninPopup}>Sign in</div><button onClick={props.showSignupPopup}>Get Started</button></div>)

  return (
    <div>
      <SearchStories />
      { hasToken ? loggedInView() : loggedOutView() }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    state: state.user.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showSigninPopup: () => {
      dispatch(showSigninPopup())
    },
    showSignupPopup: () => {
      dispatch(showSignupPopup())
    },
    showUserOptionsPopup: () => {
      dispatch(showUserOptionsPopup())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
