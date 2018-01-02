import React from 'react';
import { connect } from 'react-redux';
import { signupInfo } from '../../actions/user.js';
import { closePopup } from '../../actions/main.js';

class SignupPopup extends React.Component {
  state={
    username: '',
    password: '',
    email: ''
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    let email = this.state.email
    if ((username !== '') && (password !== '') && (email !== '')){
      this.props.signupInfo(this.state.username, this.state.password, this.state.email)
      this.setState({
        username: '',
        password: '',
        email: ''
      })
    } else {
      alert('please enter valid fields')
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.loggedIn){
      this.props.closePopup()
    }
  }

  render(){
    return (
      <div>
        <p>Sign in</p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Email' onChange={this.handleEmail} value={this.state.email}/>
          <input type='text' placeholder='Username' onChange={this.handleUsername} value={this.state.username}/>
          <input type='password' placeholder='Password' onChange={this.handlePassword} value={this.state.password}/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    loggedIn: state.user.loggedIn
  }
}

function mapDispatchToProps(dispatch){
  return {
    signupInfo: (username, password, email) => {
      dispatch(signupInfo(username, password, email))
    },
    closePopup:() => {
      dispatch(closePopup())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPopup)
