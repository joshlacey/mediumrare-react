export function searchStories(searchTerms) {
  return function (dispatch) {

    const params = {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      cache: 'no-cache'
    }
    fetch(process.env.REACT_APP_API_ENDPOINT + 'stories/tagged/' + searchTerms, params)
      .then(resp => resp.json())
      .then(stories => dispatch(sendStories(stories.tagged_stories)))
  }
}

function sendStories(stories) {
  return {
    type: 'FETCHED_STORIES',
    payload: stories
  }
}
