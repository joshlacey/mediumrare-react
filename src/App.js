import React, { Component } from 'react';
import Nav from './components/Nav';
import Body from './components/Body';
import { connect } from 'react-redux';
import Popup from './components/Popup'
import SignupPopup from './components/popups/signupPopup.js';
import SigninPopup from './components/popups/signinPopup.js';
import UserOptionsPopup from './components/popups/UserOptionsPopup';

class App extends Component {

  hasPopup = () => {
    console.log('hitcase')
    switch(this.props.popup){
      case 'signup':
        const SignupComponent = Popup(SignupPopup)
        return <SignupComponent />
      case 'signin':
        const SigninComponent = Popup(SigninPopup)
        return <SigninComponent />
      default:
        null
    }
  }

  render() {

    return (
      <div className="App">
        {this.hasPopup()}
        <Nav/>
        {this.props.showUserOptionsPopup ? <UserOptionsPopup /> : null}
        <Body/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    popup: state.main.popup,
    showUserOptionsPopup: state.user.showUserOptions
  }
}

export default connect(mapStateToProps)(App)
