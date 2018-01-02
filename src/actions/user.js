function authheaders () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwtToken')
  }
}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}

function setLocalStorage(resp) {
  localStorage.setItem("jwtToken", resp.jwt)
  localStorage.setItem("username", resp.user.username)
}

export function signinInfo(username, password) {
  return function (dispatch) {
    const body = {
      "username": username,
      "password": password
    }

    const params = {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body)
    }

    fetch(process.env.REACT_APP_API_ENDPOINT + 'login', params)
      .then(resp => resp.json())
      .then(json => {
        if(json.message){
          alert(json.message)
        } else{
          setLocalStorage(json)
          dispatch(setLoginState(json.user.username))
        }
      })
  }
}

export function signupInfo(username, password, email) {
  return function (dispatch) {
    const body = {
      "username": username,
      "password": password,
      "email": email
    }

    const params = {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body)
    }

    fetch(process.env.REACT_APP_API_ENDPOINT + 'users', params)
      .then(resp => resp.json())
      .then(json => {
        if(json.message){
          alert(json.message)
        } else {
          setLocalStorage(json)
          dispatch(setLoginState(json.user.username))
        }
      })
  }
}

function setLoginState(username) {
  return {
    type: 'LOGGED_IN',
    payload: username
  }
}

export function showUserOptionsPopup() {
  return {
    type: 'TOGGLE_USER_OPTIONS_POPUP'
  }
}
