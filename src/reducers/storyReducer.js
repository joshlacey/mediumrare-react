export default function storyReducer(state={stories: []}, action){
  switch(action.type){
    case "FETCHED_STORIES":
      return {...state, stories: action.payload}
    default:
      return state
  }
}
