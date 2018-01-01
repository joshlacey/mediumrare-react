export default function mainReducer(state={popup: ''}, action){
  switch(action.type){
    case "OPEN_POPUP_SIGNIN":
      return {...state, popup: 'signin'}
    case "OPEN_POPUP_SIGNUP":
      return {...state, popup: 'signup'}
    case "CLOSE_POPUP":
      return {...state, popup: ''}
    default:
      return state
  }
}
