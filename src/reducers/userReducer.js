export default function userReducer(state={loggedIn: false, username: '', showUserOptions: false}, action){
  switch(action.type){
    case 'LOGGED_IN':
      return {...state, loggedIn: true, username: action.payload}
    case 'LOGGED_OUT':
      return {...state, loggedIn: false, username: ''}
    case 'TOGGLE_USER_OPTIONS_POPUP':
      return {...state, showUserOptions: !state.showUserOptions }
    default:
      return state
  }
}
