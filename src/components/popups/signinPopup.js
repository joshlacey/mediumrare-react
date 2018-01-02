import React from 'react';
import { connect } from 'react-redux';
import { signinInfo } from '../../actions/user.js';
import { closePopup } from '../../actions/main.js';


class SigninPopup extends React.Component {
  state={
    username: '',
    password: ''
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

  handleSubmit = (e) => {
    e.preventDefault()
    let username = this.state.username
    let password = this.state.password
    if ((username !== '') && (password !== '')){
      this.props.signinInfo(this.state.username, this.state.password)
      this.setState({
        username: '',
        password: ''
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
          <input type='text' placeholder='Username' onChange={this.handleUsername} value={this.state.username}/>
          <input type='password' placeholder='Password' onChange={this.handlePassword} value={this.state.password}/>
          <button type="submit">Sign In</button>
        </form>
      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    loggedIn: state.user.loggedIn
  }
}

function mapDispatchToProps(dispatch){
  return {
    signinInfo: (username, password) => {
      dispatch(signinInfo(username, password))
    },
    closePopup: () => {
      dispatch(closePopup())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPopup)
